package dev.gear.repository;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import dev.gear.model.Basket;
import org.springframework.stereotype.Repository;

@Repository
public class BasketRepository {
    private DynamoDBMapper dynamoDBMapper;

    public BasketRepository(DynamoDBMapper dynamoDBMapper) {
        this.dynamoDBMapper = dynamoDBMapper;
    }

    public Basket getCartByUserId(String customer_id){
        return  dynamoDBMapper.load(Basket.class, customer_id);
    }
    public Basket save(Basket cart){
        dynamoDBMapper.save(cart);
        return cart;
    }

}
