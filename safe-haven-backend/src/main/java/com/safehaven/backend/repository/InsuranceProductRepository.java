package com.safehaven.backend.repository;

import com.safehaven.backend.entity.InsuranceProduct;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InsuranceProductRepository extends JpaRepository<InsuranceProduct, Long>
{
    boolean existsByNormalizedName(String normalizedName);
}
