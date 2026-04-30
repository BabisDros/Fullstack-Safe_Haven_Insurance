package com.safehaven.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.Instant;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class InsuranceProductDto
{
    private Long id;
//    private String normalizedName;
    private String name;
    private String type;
    private String description;
    private BigDecimal basePremium;
    private boolean active;
    private Instant creationDatetime;
}

