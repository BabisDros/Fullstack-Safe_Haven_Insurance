package com.safehaven.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;


@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "cover")
public class Cover
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Setter
    @Column(name = "normalized_name", nullable = false)
    private String normalizedName;

    @Setter
    @Column(nullable = false)
    private String name;

    @Setter
    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    private CoverType type;

    @Setter
    @Column(name = "coverage_limit", nullable = false, columnDefinition = "DECIMAL(10,2) CHECK (coverage_limit > 0)")
    private BigDecimal limit;

    @Setter
    private String description;

    @Setter
    //foreign key
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private InsuranceProduct product;
}