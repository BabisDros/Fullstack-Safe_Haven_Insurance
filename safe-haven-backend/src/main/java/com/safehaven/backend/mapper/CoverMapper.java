package com.safehaven.backend.mapper;

import com.safehaven.backend.dto.CoverDto;
import com.safehaven.backend.entity.Cover;
import com.safehaven.backend.entity.CoverType;

public class CoverMapper
{
    public static CoverDto mapToCoverDto(Cover cover)
    {
        return new CoverDto(
                cover.getId(),
                cover.getName(),
                cover.getType().name(),
                cover.getLimit(),
                cover.getDescription(),
                cover.getProduct().getId()
        );
    }

    public static Cover mapToCover(CoverDto coverDto)
    {
        Cover cover = new Cover();
        cover.setName(coverDto.getName());
        cover.setType(CoverType.valueOf(coverDto.getType()));
        cover.setLimit(coverDto.getLimit());
        cover.setDescription(coverDto.getDescription());
        return cover;
    }


    public static void updateEntityFromDto(CoverDto dto, Cover entity)
    {
        if (dto.getName() != null)
        {
            entity.setName(dto.getName());
        }
        if (dto.getType() != null)
        {
            entity.setType(CoverType.valueOf(dto.getType()));
        }
        if (dto.getLimit() != null)
        {
            entity.setLimit(dto.getLimit());
        }
        if (dto.getDescription() != null)
        {
            entity.setDescription(dto.getDescription());
        }
    }
}