package com.safehaven.backend.entity;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "insurance_product")
public class InsuranceProduct
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //see validateProductName method in insuranceServiceImplementation
    @Column(name = "normalized_name", nullable = false)
    private String normalizedName;

    @Column(nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ProductType type;

    private String description;

    @Column(name = "base_premium", nullable = false, columnDefinition = "DECIMAL(10,2) CHECK (base_premium > 0)")
    private BigDecimal basePremium;
    private boolean active;

    @CreationTimestamp
    @Column(name = "creation_datetime", nullable = false, updatable = false)
    private Instant creationDatetime;

    // mappedBy  should have the same name with the field name in Cover class
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Cover> covers = new ArrayList<>();
}
