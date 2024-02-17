package dev.gear.config;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicSessionCredentials;
import com.amazonaws.client.builder.AwsClientBuilder;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.sqs.AmazonSQS;
import com.amazonaws.services.sqs.AmazonSQSAsync;
import com.amazonaws.services.sqs.AmazonSQSAsyncClientBuilder;
import com.amazonaws.services.sqs.AmazonSQSClientBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.aws.messaging.config.QueueMessageHandlerFactory;
import org.springframework.cloud.aws.messaging.config.annotation.EnableSqs;
import org.springframework.cloud.aws.messaging.core.QueueMessagingTemplate;
import org.springframework.cloud.aws.messaging.listener.QueueMessageHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.AwsSessionCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.sqs.SqsAsyncClient;
import software.amazon.awssdk.services.sqs.SqsAsyncClientBuilder;

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
    public QueueMessagingTemplate queueMessagingTemplate() {
        return new QueueMessagingTemplate(amazonSQSAsync());
    }
    private AmazonSQSAsync amazonSQSAsync() {
        String serviceEndpoint = String.format("sqs.%s.amazonaws.com", region);
        BasicSessionCredentials sessionCredentials = new BasicSessionCredentials(accessKey, secretKey, sessionKey);
        AWSStaticCredentialsProvider credentialsProvider = new AWSStaticCredentialsProvider(sessionCredentials);
        return AmazonSQSAsyncClientBuilder
                .standard()
                .withEndpointConfiguration(new AwsClientBuilder.EndpointConfiguration(serviceEndpoint, region))
                .withCredentials(credentialsProvider)
                .build();
    }
    @Bean
    public AmazonSQS amazonSQSClient() {
        BasicSessionCredentials sessionCredentials = new BasicSessionCredentials(accessKey, secretKey, sessionKey);
        AWSStaticCredentialsProvider credentialsProvider = new AWSStaticCredentialsProvider(sessionCredentials);
        return AmazonSQSClientBuilder.standard().withCredentials(credentialsProvider)
                .withRegion("us-east-1").build();
    }

}
