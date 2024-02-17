package dev.gear.publisher;

import dev.gear.model.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.aws.messaging.core.QueueMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class OrderPublisher {
    @Autowired
    private QueueMessagingTemplate queueMessagingTemplate;

    @Value("${cloud.aws.sqs.endpoint_payment}")
    private String endPoint;

    public void publish(Order order) {
        System.out.println("Publishing orderId: " + order.getOrderId());
        queueMessagingTemplate.convertAndSend(endPoint, order);
    }


}

