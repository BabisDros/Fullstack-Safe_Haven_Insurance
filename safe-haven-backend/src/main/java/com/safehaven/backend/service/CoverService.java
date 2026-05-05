package com.safehaven.backend.service;

import com.safehaven.backend.dto.CoverDto;

public interface CoverService
{
    CoverDto createCover(CoverDto coverDto);

    CoverDto updateCover(Long id, CoverDto coverDto);

    void deleteCover(Long id);
}
