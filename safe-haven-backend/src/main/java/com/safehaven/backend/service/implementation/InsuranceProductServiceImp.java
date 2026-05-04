package com.safehaven.backend.service.implementation;

import com.safehaven.backend.dto.InsuranceProductDto;
import com.safehaven.backend.entity.InsuranceProduct;
import com.safehaven.backend.exception.DuplicateNameException;
import com.safehaven.backend.exception.ResourceNotFoundException;
import com.safehaven.backend.mapper.InsuranceProductMapper;
import com.safehaven.backend.repository.InsuranceProductRepository;
import com.safehaven.backend.service.InsuranceProductService;
import com.safehaven.backend.utilities.NameNormalizer;
import com.safehaven.backend.utilities.Validators;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InsuranceProductServiceImp implements InsuranceProductService
{
    private final InsuranceProductRepository productRepository;

    @Override
    public List<InsuranceProductDto> getAllInsuranceProducts()
    {
        List<InsuranceProduct> products = productRepository.findAll();

        return products.stream().map(InsuranceProductMapper::mapInsuranceProductToDto)
                .collect(Collectors.toList());
    }

    @Override
    public InsuranceProductDto createInsuranceProduct(InsuranceProductDto productDto)
    {
        String normalizedName = Validators.validateName(productDto.getName(),productRepository::existsByNormalizedName);

        InsuranceProduct product = InsuranceProductMapper.mapDtoToInsuranceProduct(productDto);
        product.setNormalizedName(normalizedName);

        InsuranceProduct savedProduct = productRepository.save(product);

        return InsuranceProductMapper.mapInsuranceProductToDto(savedProduct);
    }

    @Override
    public InsuranceProductDto getProductById(Long id)
    {
        InsuranceProduct product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("product not found with given id"));
        return InsuranceProductMapper.mapInsuranceProductToDto(product);
    }

    @Override
    public InsuranceProductDto updateInsuranceProduct(Long id, InsuranceProductDto productWithUpdates)
    {
        InsuranceProduct product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("product not found with given id"));

        if (productWithUpdates.getName() != null)
        {
            String normalizedName = Validators.validateNameWithId(
                    productWithUpdates.getName(),
                    productWithUpdates.getId(),
                    productRepository::existsByNormalizedNameAndIdNot
            );
            product.setNormalizedName(normalizedName);
        }

        InsuranceProductMapper.updateEntityFromDto(productWithUpdates, product);
        InsuranceProduct updatedProduct = productRepository.save(product);

        return InsuranceProductMapper.mapInsuranceProductToDto(updatedProduct);
    }

    @Override
    public void deleteInsuranceProduct(Long id)
    {
        productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("product not found with given id"));

        productRepository.deleteById(id);
    }
}
