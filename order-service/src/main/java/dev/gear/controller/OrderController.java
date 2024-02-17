package dev.gear.controller;

import com.amazonaws.services.sqs.AmazonSQS;
import com.amazonaws.services.sqs.model.Message;
import com.amazonaws.services.sqs.model.QueueDoesNotExistException;
import com.amazonaws.services.sqs.model.ReceiveMessageRequest;
import com.amazonaws.services.sqs.model.ReceiveMessageResult;
import com.fasterxml.jackson.databind.ObjectMapper;
import dev.gear.Repository.OrderRepository;
import dev.gear.model.Order;
import dev.gear.service.CreateOrder;

import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.aws.messaging.core.QueueMessagingTemplate;
import org.springframework.cloud.aws.messaging.listener.SqsMessageDeletionPolicy;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@CrossOrigin
@RestController
@RequestMapping("/order/api")
public class OrderController {
    @Autowired
    private AmazonSQS amazonSQSClient;
    @Autowired
    private QueueMessagingTemplate queueMessagingTemplate;
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private CreateOrder createOrder;
    @Value("${cloud.aws.sqs.endpoint_payment}")
    private String endPoint;

    @GetMapping(value="/test")
    public String testOrderService(){
        return "order-service is ready!";
    }
    @GetMapping
    public Order getOrderByOrderIdAndCustomerId(@RequestParam(name = "orderId") String orderId, @RequestParam(name="customerId") String customerId){
        return orderRepository.getOrderByIdAndCustomerId(orderId, customerId);
    }
    @GetMapping(value = "/customer")
    public List<Order> getOrderByCustomerId(@RequestParam(name = "customerId") String customerId){
        return  orderRepository.getOrderByCustomerIdId(customerId);
    }

    @GetMapping(value = "/put/{msg}")
    public ResponseEntity<String> putMessageToQueue(@PathVariable("msg") String message) {
        queueMessagingTemplate.convertAndSend(endPoint, message);
        return ResponseEntity.status(HttpStatus.OK).body("Message put to queue: " + message);
    }
    @PutMapping(value = "/update")
    public ResponseEntity<List<Order>> updateStatusOrders(@RequestParam(name="orderId") String orderId, @RequestParam(name="customerId") String customerId){
        return ResponseEntity.ok().body(orderRepository.updateOrderStatus(orderId, customerId));
    }

    @Scheduled(fixedDelay = 1000) // executes on every 5 second gap.
    public void receiveMessages() {
        try {
            String queueUrl = amazonSQSClient.getQueueUrl("order").getQueueUrl();
            ObjectMapper mapper = new ObjectMapper();
            log.info("Reading SQS Queue done: URL {}", queueUrl);
            // set waitTime ไม่งั้นแม่งดึงตลอด แถมยังดึงไม่เจอด้วย
            ReceiveMessageRequest receiveMessageRequest = new ReceiveMessageRequest(queueUrl)
                    .withWaitTimeSeconds(20);

            ReceiveMessageResult receiveMessageResult = amazonSQSClient.receiveMessage(receiveMessageRequest);
            if (!receiveMessageResult.getMessages().isEmpty()) {
                Message message = receiveMessageResult.getMessages().get(0);
                log.info("Incoming Message From SQS {}", message.getMessageId());
                log.info("Message Body {}", message.getBody());

                createOrder.createOrderFormEventBus(message);

                amazonSQSClient.deleteMessage(queueUrl, message.getReceiptHandle());
            }
        } catch (QueueDoesNotExistException e) {
            log.error("Queue does not exist {}", e.getMessage());
        }

    }



}




