package com.safehaven.backend.controller;

import com.safehaven.backend.dto.InsuranceProductDto;
import com.safehaven.backend.service.InsuranceProductService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/insurance-products")
public class InsuranceProductController
{
    private InsuranceProductService productService;

    //Build Add InsuranceProduct REST API
    @PostMapping
    public ResponseEntity<InsuranceProductDto> createInsuranceProduct(@RequestBody InsuranceProductDto productDto)
    {
        InsuranceProductDto savedInsuranceProduct = productService.createInsuranceProduct(productDto);
        return  new ResponseEntity<>(savedInsuranceProduct, HttpStatus.CREATED);
    }

    @GetMapping
    public  ResponseEntity<List<InsuranceProductDto>> getAllInsuranceProducts()
    {
        List<InsuranceProductDto> products= productService.getAllInsuranceProducts();
        return ResponseEntity.ok(products);
    }


    //Build Get InsuranceProduct REST API
    @GetMapping("{id}")
    public ResponseEntity<InsuranceProductDto> getInsuranceProduct(@PathVariable("id") Long id)
    {
        InsuranceProductDto product = productService.getProductById(id);
        return  ResponseEntity.ok(product);
    }

    @PutMapping("{id}")
    public ResponseEntity<InsuranceProductDto> updateProduct(@PathVariable("id") Long id, @RequestBody InsuranceProductDto productWithUpdates)
    {
        InsuranceProductDto product = productService.updateInsuranceProduct(id, productWithUpdates);
        return  ResponseEntity.ok(product);
    }
}
