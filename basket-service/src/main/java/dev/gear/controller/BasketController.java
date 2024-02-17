package dev.gear.controller;

import dev.gear.model.Basket;
import dev.gear.model.Checkout;
import dev.gear.model.ProductRequest;
import dev.gear.repository.BasketRepository;
import dev.gear.service.BasketService;
import org.springframework.web.bind.annotation.*;
@CrossOrigin
@RestController
@RequestMapping("/basket/api")
public class BasketController {
    private BasketRepository basketRepository;
    private BasketService basketService;

    public BasketController(BasketRepository basketRepository, BasketService basketService) {
        this.basketRepository = basketRepository;
        this.basketService = basketService;
    }
    @GetMapping(value="/test")
    public String testService(){
        return "service is already in state!";
    }

    @PostMapping
    public Basket createCart(@RequestBody Basket cart) {
        return basketService.createBasket(cart);
    }
    @PutMapping
    public Basket addItemToCart(@RequestBody ProductRequest productRequest){
       return  basketService.increaseProduct(productRequest);
    }
    @GetMapping
    public Basket getBasketByCustomerId(@RequestParam(value = "customerId") String customerId){
        return  basketRepository.getCartByUserId(customerId);
    }

    @PutMapping(value = "/delete")
    public Basket deleteProduct(@RequestBody ProductRequest productRequest) {
        return  basketService.decreaseProduct(productRequest);
    }


    @PostMapping(value = "/checkout")
    public String checkout(@RequestBody Checkout checkout){
        String result;
        Basket itemCheckoutBasket = basketRepository.getCartByUserId(checkout.getCustomer_id());
        if(itemCheckoutBasket !=null){
            result = basketService.putEventCheckoutBasket(itemCheckoutBasket);
        }
        else{
            result = "Basket not found for customerId : " +checkout.getCustomer_id();
        }
        return  result;
    }



}
