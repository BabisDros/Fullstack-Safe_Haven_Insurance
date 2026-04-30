package com.safehaven.backend.service;

import com.safehaven.backend.dto.InsuranceProductDto;

import java.util.List;

public interface InsuranceProductService
{
    List<InsuranceProductDto> getAllInsuranceProducts();

    InsuranceProductDto createInsuranceProduct(InsuranceProductDto insuranceProductDto);

    InsuranceProductDto getProductById(long id);

    InsuranceProductDto updateInsuranceProduct(long id, InsuranceProductDto updatedProduct);
}
