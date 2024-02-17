package dev.gear.Repository;

import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.datamodeling.*;
import com.amazonaws.services.dynamodbv2.document.*;
import com.amazonaws.services.dynamodbv2.document.spec.QuerySpec;
import com.amazonaws.services.dynamodbv2.document.utils.ValueMap;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.amazonaws.services.dynamodbv2.model.GetItemRequest;
import dev.gear.model.Order;
import dev.gear.model.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class OrderRepository {
    private DynamoDBMapper dynamoDBMapper;

    public OrderRepository(DynamoDBMapper dynamoDBMapper) {
        this.dynamoDBMapper = dynamoDBMapper;
    }

    public Order save(Order order){
        dynamoDBMapper.save(order);
        return order;
    }
    public List<Order> getOrderByCustomerIdId(String customerId) {

        Map<String, AttributeValue> eav = new HashMap<String, AttributeValue>();
        eav.put(":val1", new AttributeValue().withS(customerId));
        DynamoDBScanExpression scan2Expression = new DynamoDBScanExpression()
                .withFilterExpression("customerId = :val1").withExpressionAttributeValues(eav);
        List<Order> orderScanResult = dynamoDBMapper.scan(Order.class, scan2Expression);
        for(Order order : orderScanResult){
            System.out.println("orderScan"+order);
        }

        return orderScanResult;
    }
    public List<Order> getOrdersByIds(List<String> orderIds) {
        List<Order> orders = new ArrayList<>();
        try {
            for (String orderId : orderIds) {
                Order order = dynamoDBMapper.load(Order.class, orderId);
                if (order != null) {
                    orders.add(order);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("Exception occurred while retrieving orders");
        }
        return orders;
    }
    public String DeleteOrderById(String orderId){
        Order order = null;
        try {
            dynamoDBMapper.delete(dynamoDBMapper.load(Order.class, orderId));

        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("Exception, Returning empty order");
            order = new Order();
        }
        return "remove order success order id = "+ orderId;
    }
    public Order getOrderByIdAndCustomerId(String orderId, String customerId) {
        Map<String, AttributeValue> eav = new HashMap<String, AttributeValue>();
        eav.put(":val1", new AttributeValue().withS(orderId));
        eav.put(":val2", new AttributeValue().withS(customerId));
        DynamoDBScanExpression scanExpression = new DynamoDBScanExpression()
                .withFilterExpression("orderId = :val1 and customerId = :val2").withExpressionAttributeValues(eav);
        List<Order> orderScanResult = dynamoDBMapper.scan(Order.class, scanExpression);
        System.out.println("orders of customer : "+customerId);
        for(Order order : orderScanResult){
            System.out.println(order);
        }

       return orderScanResult.get(0);
    }
    public List<Order> updateOrderStatus(String orderId, String customerId) {
        Map<String, AttributeValue> eav = new HashMap<String, AttributeValue>();
        eav.put(":val1", new AttributeValue().withS(orderId));
        eav.put(":val2", new AttributeValue().withS(customerId));
        DynamoDBScanExpression scanExpression = new DynamoDBScanExpression()
                .withFilterExpression("orderId = :val1 and customerId = :val2").withExpressionAttributeValues(eav);
        List<Order> orderScanResult = dynamoDBMapper.scan(Order.class, scanExpression);
        orderScanResult.get(0).setOrderStatus("ORDER_PAYED");
        dynamoDBMapper.save(orderScanResult.get(0));
        return orderScanResult;
    }

}

