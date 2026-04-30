package com.safehaven.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "cover")
public class Cover
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "normalized_name", nullable = false)
    private String normalizedName;

    @Column(nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "cover_type", nullable = false)
    private CoverType type;

    @Column(name = "coverage_limit", nullable = false, columnDefinition = "DECIMAL(10,2) CHECK (coverage_limit > 0)")
    private BigDecimal coverageLimit;

    private String description;

    //foreign key
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private InsuranceProduct product;
}