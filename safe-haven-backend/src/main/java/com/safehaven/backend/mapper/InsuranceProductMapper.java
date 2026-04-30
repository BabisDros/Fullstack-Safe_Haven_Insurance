package com.safehaven.backend.mapper;

import com.safehaven.backend.dto.InsuranceProductDto;
import com.safehaven.backend.entity.InsuranceProduct;
import com.safehaven.backend.entity.ProductType;

public class InsuranceProductMapper
{
    public static InsuranceProductDto mapInsuranceProductToDto(InsuranceProduct product)
    {
        return new InsuranceProductDto(
                product.getId(),
                product.getName(),
                product.getType().name(),
                product.getDescription(),
                product.getBasePremium(),
                product.isActive(),
                product.getCreationDatetime()
        );
    }

    public static InsuranceProduct mapDtoToInsuranceProduct(InsuranceProductDto productDto)
    {
        InsuranceProduct product = new InsuranceProduct();

        product.setName(productDto.getName());
        product.setType(ProductType.valueOf(productDto.getType()));
        product.setDescription(productDto.getDescription());
        product.setBasePremium(productDto.getBasePremium());
        product.setActive(productDto.isActive());

        return product;
    }

    public static void updateEntityFromDto(InsuranceProductDto dto, InsuranceProduct entity)
    {
        if (dto.getName() != null) entity.setName(dto.getName());
        if (dto.getType() != null) entity.setType(ProductType.valueOf(dto.getType()));
        if (dto.getDescription() != null) entity.setDescription(dto.getDescription());
        if (dto.getBasePremium() != null) entity.setBasePremium(dto.getBasePremium());
        entity.setActive(dto.isActive());
    }
}
