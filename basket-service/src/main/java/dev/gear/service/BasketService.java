package dev.gear.service;

import com.amazonaws.services.eventbridge.AmazonEventBridge;
import com.amazonaws.services.eventbridge.model.PutEventsRequest;
import com.amazonaws.services.eventbridge.model.PutEventsRequestEntry;
import com.amazonaws.services.eventbridge.model.PutEventsResult;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import dev.gear.model.Basket;
import dev.gear.model.Product;
import dev.gear.model.ProductRequest;
import dev.gear.repository.BasketRepository;

import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;

@Service
public class BasketService {

    private final AmazonEventBridge amazonEventBridge;
    private final BasketRepository basketRepository;

    public BasketService(AmazonEventBridge amazonEventBridge, BasketRepository basketRepository) {
        this.amazonEventBridge = amazonEventBridge;
        this.basketRepository = basketRepository;
    }

    public String putEventCheckoutBasket(Basket itemCheckoutBasket){
        ObjectMapper objectMapper = new ObjectMapper();
        String itemCheckoutJson = null;
        try {
            itemCheckoutJson = objectMapper.writeValueAsString(itemCheckoutBasket);
        }catch (JsonProcessingException e){
            e.printStackTrace();
        }
        PutEventsRequestEntry requestEntry = new PutEventsRequestEntry();
        requestEntry.withSource("basket-event")
                .withDetailType("basket-add-detail")
                .withDetail(itemCheckoutJson)
                .withEventBusName("cloud-project-event-bus");
        PutEventsRequest req = new PutEventsRequest();
        // can put many
        req.withEntries(requestEntry);
        PutEventsResult result = amazonEventBridge.putEvents(req);
        Basket blackBasket = new Basket();
        blackBasket.setCustomer_id(itemCheckoutBasket.getCustomer_id());
        blackBasket.setProduct_list(new ArrayList<>());
        blackBasket.setTotal_price(BigDecimal.ZERO);
        basketRepository.save(blackBasket);
        return result.toString();
    }
    public Basket createBasket(Basket cart){
        Basket exitedCartUser = basketRepository.getCartByUserId(cart.getCustomer_id());
        if (exitedCartUser != null) {
            // return cart user
            return exitedCartUser;
        } else {
            Basket newCartOfUser = Basket
                    .builder()
                    .customer_id(cart.getCustomer_id())
                    .product_list(cart.getProduct_list())
                    .total_price(BigDecimal.ZERO)
                    .build();
            basketRepository.save(newCartOfUser);
            return  basketRepository.getCartByUserId(cart.getCustomer_id());
        }
    }

    public Basket increaseProduct(ProductRequest productRequest) {
        Basket exitedCartUser = basketRepository.getCartByUserId(productRequest.getCustomer_id());
        boolean productExists = false;
        for (int i = 0; i < exitedCartUser.getProduct_list().size(); i++) {
            Product existingProduct = exitedCartUser.getProduct_list().get(i);
            // Check if product already exists in the cart
            if (productRequest.getProduct().getProduct_id().equals(existingProduct.getProduct_id())) {
                // Increase product_count
                int newProductCount = existingProduct.getProduct_count() + productRequest.getProduct().getProduct_count();
                existingProduct.setProduct_count(newProductCount);
                productExists = true;
                break;
            }
        }
        // If the product doesn't exist in the cart, add it
        if (!productExists) {
            exitedCartUser.addProduct(productRequest.getProduct());
        }
        // Recalculate total price
        BigDecimal total = BigDecimal.ZERO;
        for (Product product : exitedCartUser.getProduct_list()) {
            total = total.add(product.getProduct_price().multiply(BigDecimal.valueOf(product.getProduct_count())));
        }
        exitedCartUser.setTotal_price(total);
        // Save the updated cart
        basketRepository.save(exitedCartUser);
        return basketRepository.getCartByUserId(productRequest.getCustomer_id());
    }

    public Basket decreaseProduct(ProductRequest productRequest){
        Basket exitedCartUser = basketRepository.getCartByUserId(productRequest.getCustomer_id());
        boolean productExists = false;
        for (int i = 0; i < exitedCartUser.getProduct_list().size(); i++) {
            Product existingProduct = exitedCartUser.getProduct_list().get(i);
            // Check if product already exists in the cart
            if (productRequest.getProduct().getProduct_id().equals(existingProduct.getProduct_id())) {
                // decrease product_count
                int newProductCount = 0;
                if(existingProduct.getProduct_count() > 1) {
                    newProductCount = existingProduct.getProduct_count() - productRequest.getProduct().getProduct_count();
                }
                else {
                    exitedCartUser.getProduct_list().remove(i);
                }
                existingProduct.setProduct_count(newProductCount);
                productExists = true;
                break;
            }
        }
        // If the product doesn't exist in the cart, add it
        if (!productExists){
            return exitedCartUser;
        }
        // Recalculate total price
        BigDecimal total = BigDecimal.ZERO;
        for (Product product : exitedCartUser.getProduct_list()) {
            total = total.add(product.getProduct_price().multiply(BigDecimal.valueOf(product.getProduct_count())));
        }
        exitedCartUser.setTotal_price(total);
        // Save the updated cart
        basketRepository.save(exitedCartUser);
        return basketRepository.getCartByUserId(productRequest.getCustomer_id());
    }
}
