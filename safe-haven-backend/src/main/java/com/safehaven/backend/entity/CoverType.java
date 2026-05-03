package com.safehaven.backend.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum CoverType {
    MEDICAL("Medical"),
    BAGGAGE("Baggage"),
    LIABILITY("Liability"),
    PROPERTY_DAMAGE("Property Damage"),
    THEFT("Theft"),
    NATURAL_DISASTER("Natural Disaster"),
    TRIP_CANCELLATION("Trip Cancellation");

    private final String label;

    public String getValue() {
        return name();
    }
}