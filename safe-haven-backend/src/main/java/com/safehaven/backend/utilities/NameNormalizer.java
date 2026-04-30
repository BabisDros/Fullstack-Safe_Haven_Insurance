package com.safehaven.backend.utilities;

public class NameNormalizer
{
    public static String normalizeName(String name)
    {
        return name.toLowerCase().replaceAll("[^a-z0-9]", "");
    }
}
