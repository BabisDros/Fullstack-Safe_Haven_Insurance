package com.safehaven.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CoverDto {
    private Long id;
    private String name;
    private String type;
    private BigDecimal limit;
    private String description;
    private Long insuranceProductId;
}