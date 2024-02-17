package dev.gear.model;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBDocument;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@DynamoDBDocument
public class Product {
    @DynamoDBAttribute
    @DynamoDBHashKey
    String product_id;
    @DynamoDBAttribute
    String product_name;
    @DynamoDBAttribute
    String product_details;
    @DynamoDBAttribute
    Integer product_count;
    @DynamoDBAttribute
    BigDecimal product_price;
}
