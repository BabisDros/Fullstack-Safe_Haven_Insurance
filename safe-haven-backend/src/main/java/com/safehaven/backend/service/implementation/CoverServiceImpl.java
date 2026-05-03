package com.safehaven.backend.service.implementation;

import com.safehaven.backend.dto.CoverDto;
import com.safehaven.backend.entity.Cover;
import com.safehaven.backend.entity.InsuranceProduct;
import com.safehaven.backend.exception.DuplicateNameException;
import com.safehaven.backend.exception.ResourceNotFoundException;
import com.safehaven.backend.mapper.CoverMapper;
import com.safehaven.backend.repository.CoverRepository;
import com.safehaven.backend.repository.InsuranceProductRepository;
import com.safehaven.backend.service.CoverService;
import com.safehaven.backend.utilities.NameNormalizer;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CoverServiceImpl implements CoverService
{
    private final CoverRepository coverRepository;
    private final InsuranceProductRepository insuranceProductRepository;

    @Override
    public CoverDto createCover(CoverDto coverDto)
    {
        InsuranceProduct product = insuranceProductRepository.findById(coverDto.getInsuranceProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Insurance Product not found with id: " + coverDto.getInsuranceProductId()));
        String normalizedName = validateCoverName(coverDto.getName());

        Cover cover = CoverMapper.mapToCover(coverDto);
        cover.setNormalizedName(normalizedName);

        cover.setProduct(product);

        Cover savedCover = coverRepository.save(cover);

        return CoverMapper.mapToCoverDto(savedCover);
    }

    @Override
    public CoverDto updateCover(Long id, CoverDto coverWithUpdates)
    {
        Cover cover = coverRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cover not found with given id: " + id));

        if (coverWithUpdates.getName() != null)
        {
            cover.setNormalizedName(NameNormalizer.normalizeName(coverWithUpdates.getName()));
        }

        CoverMapper.updateEntityFromDto(coverWithUpdates, cover);
        Cover updatedCover = coverRepository.save(cover);

        return CoverMapper.mapToCoverDto(updatedCover);
    }

    @Override
    public void deleteCover(Long id)
    {
        coverRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cover not found with given id: " + id));

        coverRepository.deleteById(id);
    }


    private String validateCoverName(String name)
    {
        String normalizedName = NameNormalizer.normalizeName(name);
        if (coverRepository.existsByNormalizedName(normalizedName))
        {
            throw new DuplicateNameException("Cover with name " + name + " already exists");
        }
        return normalizedName;
    }
}