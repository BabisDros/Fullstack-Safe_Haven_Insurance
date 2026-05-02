package com.safehaven.backend.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum ProductType {
    LIFE("Life insurance"),
    HOME("Home insurance"),
    TRAVEL("Travel Insurance"),
    AUTO("Car insurance");

    private final String label;

    public String getValue()
    {
        return name();
    }
}
