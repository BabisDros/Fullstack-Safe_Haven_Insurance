package com.safehaven.backend.repository;

import com.safehaven.backend.entity.InsuranceProduct;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InsuranceProductRepository extends JpaRepository<InsuranceProduct, Long>
{
    //Spring Data JPA Will create the query automatically with exists for normalizedName (same name as field in entity)
    boolean existsByNormalizedName(String normalizedName);
    boolean existsByNormalizedNameAndIdNot(String normalizedName, Long id);
}
