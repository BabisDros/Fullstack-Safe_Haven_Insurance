package com.safehaven.backend.service.implementation;

import com.safehaven.backend.dto.CoverDto;
import com.safehaven.backend.entity.Cover;
import com.safehaven.backend.entity.CoverType;
import com.safehaven.backend.entity.InsuranceProduct;
import com.safehaven.backend.exception.DuplicateNameException;
import com.safehaven.backend.exception.ResourceNotFoundException;
import com.safehaven.backend.repository.CoverRepository;
import com.safehaven.backend.repository.InsuranceProductRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CoverServiceImplTest
{
    @Mock
    private CoverRepository coverRepository;
    @Mock
    private InsuranceProductRepository insuranceProductRepository;

    @InjectMocks
    private CoverServiceImpl coverService;


    private CoverDto coverDto;
    private InsuranceProduct product;
    private Cover cover;

    @BeforeEach
    void setup()
    {
        this.coverDto = CoverDto.builder()
                .id(1L)
                .name("test")
                .type(CoverType.BAGGAGE.name())
                .limit(new BigDecimal("100"))
                .insuranceProductId(2L)
                .build();

        this.product = new InsuranceProduct();
        this.product.setId(100L);
        this.product.setName("Health Plan");

        this.cover = new Cover();
        this.cover.setName("test");
        this.cover.setType(CoverType.BAGGAGE);
        this.cover.setLimit(new BigDecimal("100"));
        this.cover.setDescription("ffe");
        this.cover.setProduct(this.product);
    }

    //inner class to group tests for CreateCover
    @Nested
    class CreateCoverTests
    {
        @Test
        void shouldCreateCoverSuccessfully()
        {
            //given
            Long productId = 2L;
            coverDto.setInsuranceProductId(productId);

            when(insuranceProductRepository.findById(productId)).thenReturn(Optional.of(product));

            // Return the same Cover instance that was passed to the save() method.
            when(coverRepository.save(any(Cover.class))).thenAnswer(invocation -> invocation.getArgument(0));

            //when
            CoverDto result = coverService.createCover(coverDto);

            //then
            assertNotNull(result);
            verify(insuranceProductRepository).findById(productId);
            verify(coverRepository).save(any(Cover.class));
        }

        @Test
        void shouldThrowExceptionWhenProductNotFound()
        {
            //given
            Long productId = 100L;
            coverDto.setInsuranceProductId(productId);
            when(insuranceProductRepository.findById(productId)).thenReturn(Optional.empty());

            //when, the
            assertThrows(ResourceNotFoundException.class, () -> {
                coverService.createCover(coverDto);
            });
            verify(coverRepository, never()).save(any());
        }
    }

    @Nested
    class updateCoverTests
    {
        @Test
        void shouldUpdateCoverSuccessfully()
        {
            //given
            Long coverId = 2L;
            when(coverRepository.findById(coverId)).thenReturn(Optional.of(cover));
            when(coverRepository.save(any(Cover.class))).thenAnswer(invocation -> invocation.getArgument(0));

            //when
            CoverDto result = coverService.updateCover(coverId, coverDto);

            //then
            assertNotNull(result);
            verify(coverRepository).findById(coverId);
            verify(coverRepository).save(any(Cover.class));
        }

        @Test
        void shouldThrowExceptionWhenCoverNotFound()
        {
            Long coverId = 2L;
            when(coverRepository.findById(coverId)).thenReturn(Optional.empty());

            //when, then
            assertThrows(ResourceNotFoundException.class, () -> {
                coverService.updateCover(coverId, coverDto);
            });
            verify(coverRepository).findById(coverId);
            verify(coverRepository, never()).save(any());
        }
    }

    @Nested
    class deleteCoverTests
    {
        @Test
        void shouldDeleteCoverSuccessfully()
        {

        }
    }

    @DisplayName("Should Throw DuplicateNameException When Cover Name Already Exists")
    @Test
    void shouldThrowDuplicateNameException()
    {
        //given
        Long productId = 2L;
        coverDto.setInsuranceProductId(productId);

        when(insuranceProductRepository.findById(productId))
                .thenReturn(Optional.of(product));

        when(coverRepository.existsByNormalizedName(anyString()))
                .thenReturn(true);

        //when, then
        assertThrows(DuplicateNameException.class, () -> coverService.createCover(coverDto));
        verify(insuranceProductRepository).findById(productId);
        verify(coverRepository).existsByNormalizedName(anyString());
        verify(coverRepository, never()).save(any());
    }
}