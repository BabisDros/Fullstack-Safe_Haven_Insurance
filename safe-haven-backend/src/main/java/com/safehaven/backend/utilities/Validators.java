package com.safehaven.backend.utilities;

import com.safehaven.backend.exception.DuplicateNameException;

import java.util.function.BiPredicate;
import java.util.function.Predicate;

public class Validators
{
    public static String validateName(String name,Predicate<String> existsByName) {

        String normalizedName = NameNormalizer.normalizeName(name);

        if (existsByName.test(normalizedName)) {
            throw new DuplicateNameException("Entity with name " + name + " already exists");
        }

        return normalizedName;
    }

    public static String validateNameWithId(String name,Long currentId,
                                            BiPredicate<String, Long> existsByNameAndIdNot)
    {

        String normalizedName = NameNormalizer.normalizeName(name);

        if (existsByNameAndIdNot.test(normalizedName, currentId)) {
            throw new DuplicateNameException("Entity with name " + name + " already exists");
        }

        return normalizedName;
    }
}
