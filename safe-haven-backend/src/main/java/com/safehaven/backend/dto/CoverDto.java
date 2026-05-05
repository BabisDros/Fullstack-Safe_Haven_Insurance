package com.safehaven.backend.dto;

import lombok.*;

import java.math.BigDecimal;

@Builder(toBuilder = true)
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