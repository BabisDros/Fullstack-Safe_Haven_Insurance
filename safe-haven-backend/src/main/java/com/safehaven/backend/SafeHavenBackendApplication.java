package com.safehaven.backend;

import com.safehaven.backend.entity.ProductType;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import tools.jackson.databind.ObjectMapper;

@SpringBootApplication
public class SafeHavenBackendApplication {
    public static void main(String[] args) {
        SpringApplication.run(SafeHavenBackendApplication.class, args);
    }
}
