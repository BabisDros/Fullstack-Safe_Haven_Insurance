package com.safehaven.backend.utilities;

public class NameNormalizer
{
    public static String normalizeName(String name)
    {
        //replace any character and number in any language with empty string, to make one continuous word
        return name.toLowerCase().replaceAll("[^\\p{L}\\p{N}]", "");
    }
}
