package com.safehaven.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class InsuranceProductCreateDto
{
    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Type is required")
    private String type;

    private String description;

    @NotNull
    @Positive(message = "Premium must be a positive number")
    private BigDecimal basePremium;

    private boolean active = true;
}
