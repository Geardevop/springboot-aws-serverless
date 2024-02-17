package dev.gear;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Import;

import dev.gear.controller.PingController;


@SpringBootApplication
// We use direct @Import instead of @ComponentScan to speed up cold starts
// @ComponentScan(basePackages = "dev.gear.controller")
@Import({ PingController.class })
public class Application  {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}