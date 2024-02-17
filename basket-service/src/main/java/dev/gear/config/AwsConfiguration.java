package dev.gear.config;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicSessionCredentials;
import com.amazonaws.client.builder.AwsClientBuilder;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClient;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.eventbridge.AmazonEventBridge;
import com.amazonaws.services.eventbridge.AmazonEventBridgeClient;
import com.amazonaws.services.eventbridge.AmazonEventBridgeClientBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AwsConfiguration {
    @Value("${cloud.aws.credentials.access-key}")
    private String accessKey;
    @Value("${cloud.aws.credentials.secret-key}")
    private String secretKey;
    @Value("${cloud.aws.region.static}")
    private String region;
    @Value("${cloud.aws.credentials.session-key}")
    private String sessionKey;
    @Bean
    public DynamoDBMapper dynamoDBMapper() {
        return new DynamoDBMapper(buildAmazonDynamoDB());
    }

    private AmazonDynamoDB buildAmazonDynamoDB() {
        String serviceEndpoint = String.format("dynamodb.%s.amazonaws.com", region);
        AwsClientBuilder.EndpointConfiguration endpointConfiguration = new AwsClientBuilder.EndpointConfiguration(
                serviceEndpoint,
                region);
        BasicSessionCredentials sessionCredentials = new BasicSessionCredentials(accessKey, secretKey, sessionKey);
        AWSStaticCredentialsProvider credentialsProvider = new AWSStaticCredentialsProvider(sessionCredentials);
        return AmazonDynamoDBClientBuilder
                .standard()
                .withEndpointConfiguration(endpointConfiguration)
                .withCredentials(credentialsProvider)
                .build();
    }
    @Bean
    public AmazonEventBridge AmazonEventBridgeClient(){
        BasicSessionCredentials sessionCredentials = new BasicSessionCredentials(accessKey, secretKey, sessionKey);
        AWSStaticCredentialsProvider credentialsProvider = new AWSStaticCredentialsProvider(sessionCredentials);
        return AmazonEventBridgeClient.builder()
                .withRegion(region)
                .withCredentials(credentialsProvider)
                .build();
    }


}
