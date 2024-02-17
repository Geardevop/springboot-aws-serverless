package dev.gear.controller;

import com.sun.net.httpserver.Authenticator;
import dev.gear.Payment;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@CrossOrigin
@RestController
@RequestMapping("/payment/api")
public class PaymentController {
    @GetMapping(value = "/test")
    public String testPaymentService(){
        return "payment-service-is-success";
    }

    @PutMapping(value = "/checkout")
    public ResponseEntity<?> checkoutOrder(
            @RequestBody Payment payment
    ){
        if(payment.getCardInfo().equals("1234123412341234") && payment.getMmyy().equals("0306") && payment.getCvv().equals("12345")){
            return new ResponseEntity<Authenticator.Success>(HttpStatus.OK);
        }
        else{
            return new ResponseEntity<Error>(HttpStatus.BAD_REQUEST);
        }
    }
}