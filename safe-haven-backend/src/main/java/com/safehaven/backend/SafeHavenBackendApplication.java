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
//TODO remove 
     @Bean
     public CommandLineRunner testEnumOutput() {
         return args -> {

         ObjectMapper mapper = new ObjectMapper();

         ProductType type = ProductType.AUTO;

         System.out.println("Value (name): " + type.getValue());
         System.out.println("Label (toString): " + type.getLabel());


         String fullJson = mapper.writerWithDefaultPrettyPrinter()
         .writeValueAsString(ProductType.values());

         System.out.println("\n--- JSON Serialization Output for React ---");
         System.out.println(fullJson);
         };
     }
}
