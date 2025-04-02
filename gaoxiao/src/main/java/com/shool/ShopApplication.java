package com.shool;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan(basePackages = "com.shool.mapper")
public class ShopApplication {

    public static void main(String[] args) {
        SpringApplication.run(com.shool.ShopApplication.class, args);
    }

}
