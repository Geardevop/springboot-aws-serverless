package dev.gear.service;

import com.amazonaws.services.sqs.model.Message;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import dev.gear.Repository.OrderRepository;
import dev.gear.model.Order;
import dev.gear.model.Product;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Slf4j
@Service
public class CreateOrder {
    @Autowired
    private OrderRepository orderRepository;

    public Order createOrderFormEventBus(Message message){
        ObjectMapper mapper = new ObjectMapper();
        Order order = new Order();
        try{
            JsonNode jsonNode = mapper.readTree(message.getBody());
            System.out.println("SQS MESSAGE :" + jsonNode.toString());
            JsonNode detailNode = jsonNode.get("detail");

            // Extracting key value
            String customerId = detailNode.get("customer_id").asText();
            JsonNode productList = detailNode.get("product_list");
            String total_price = detailNode.get("total_price").asText();

            // create order
            order.setOrderStatus("ORDER_CREATED");
            order.setCustomerId(customerId.toString());
            order.setOrderTotalPrice(new BigDecimal(total_price));
            ArrayList<Product> products = new ArrayList<>();
            // create Product
            for (JsonNode productNode : productList) {
                String productId = productNode.get("product_id").asText();
                String productName = productNode.get("product_name").asText();
                String product_details = productNode.get("product_details").asText();
                Integer product_count = productNode.get("product_count").asInt();
                BigDecimal product_price = productNode.get("product_price").decimalValue();

                Product product = new Product();
                product.setProduct_id(productId);
                product.setProduct_name(productName);
                product.setProduct_details(product_details);
                product.setProduct_count(product_count);
                product.setProduct_price(product_price);

                products.add(product);
            }
            order.setProduct(products);
            String time = new Timestamp(System.currentTimeMillis()).toString();
            order.setCreatedTimestamp(time);
            order.setUpdatedTimestamp(time);
//            orderRepository.getOrderByIdAndCustomerId(order.getOrderId().toString(), order.getCustomerId());
            Order orderSaved = orderRepository.save(order);
            log.info("order already saved {}", orderSaved);

        }catch (Exception e){
            e.printStackTrace();
        }
        return  order;
    }
}
