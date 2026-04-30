package com.safehaven.backend.entity;

public enum ProductType
{
    LIFE, HOME, TRAVEL,AUTO;

    @Override
    public String toString()
    {
        return switch (this)
        {
            case LIFE -> "Life insurance";
            case HOME -> "Home insurance";
            case TRAVEL -> "Travel Insurance";
            case AUTO -> "Car insurance";
        };
    }
}
