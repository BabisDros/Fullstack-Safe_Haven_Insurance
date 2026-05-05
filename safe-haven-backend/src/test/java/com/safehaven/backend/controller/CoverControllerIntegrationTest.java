package com.safehaven.backend.controller;

import com.safehaven.backend.dto.CoverDto;
import com.safehaven.backend.entity.Cover;
import com.safehaven.backend.entity.CoverType;
import com.safehaven.backend.entity.InsuranceProduct;
import com.safehaven.backend.entity.ProductType;
import com.safehaven.backend.mapper.CoverMapper;
import com.safehaven.backend.repository.CoverRepository;
import com.safehaven.backend.repository.InsuranceProductRepository;
import com.safehaven.backend.utilities.NameNormalizer;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import tools.jackson.databind.ObjectMapper;

import java.math.BigDecimal;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
class CoverControllerIntegrationTest
{
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;
    @Autowired
    private InsuranceProductRepository productRepository;
    @Autowired
    private CoverRepository coverRepository;

    InsuranceProduct savedProduct;
    Cover savedCover;
    CoverDto coverDto;

    @BeforeEach
    void setup()
    {
        //save a product first because is needed for the cover
        this.savedProduct = new InsuranceProduct();
        this.savedProduct.setName("Test product");
        this.savedProduct.setType(ProductType.AUTO);
        this.savedProduct.setActive(true);
        this.savedProduct.setBasePremium(new BigDecimal(10));
        this.savedProduct.setNormalizedName(NameNormalizer.normalizeName(savedProduct.getName()));
        this.savedProduct = productRepository.save(savedProduct);

        this.coverDto = new CoverDto();
        this.coverDto.setName("Test cover");
        this.coverDto.setLimit(new BigDecimal(10));
        this.coverDto.setType(String.valueOf(CoverType.BAGGAGE));
        this.coverDto.setDescription("Test description");
        this.coverDto.setInsuranceProductId(savedProduct.getId());

        //add a cover in database based on cover dto
        Cover cover = CoverMapper.mapToCover(coverDto);
        cover.setNormalizedName(NameNormalizer.normalizeName(coverDto.getName()));
        cover.setProduct(savedProduct);  //add foreign key
        savedCover = coverRepository.save(cover);
    }

    @Nested
    class createCoverTests
    {
        @Test
        void shouldReturnCreatedCover() throws Exception
        {
            String uniqueName = "NewName";//set a new name so the cover is created
            coverDto.setName(uniqueName);
            mockMvc.perform(post("/api/covers")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(coverDto)))
                    .andExpect(status().isCreated())
                    .andExpect(jsonPath("$.id").isNumber())
                    .andExpect(jsonPath("$.name").value(uniqueName))
                    .andExpect(jsonPath("$.type").value(String.valueOf(CoverType.BAGGAGE)))
                    .andExpect(jsonPath("$.limit").value(10.0));
        }

        @DisplayName("Should Throw 409 when a Cover with the same name exists in database")
        @Test
        void shouldThrowExceptionWhenDuplicateName() throws Exception
        {
            mockMvc.perform(post("/api/covers")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(coverDto)))
                    .andExpect(status().isConflict());
        }

        @DisplayName("Should Throw 404 when a cover with no Product id is given and there isn't in database")
        @Test
        void shouldReturn404() throws Exception
        {
            //set id that doesnt exist in database. 0  will never be assign from database, it starts from 1
            coverDto.setInsuranceProductId(0L);

            mockMvc.perform(post("/api/covers")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(coverDto)))
                    .andExpect(status().isNotFound());
        }
    }

    @Nested
    class updateCoverTests
    {
        @Test
        void shouldUpdateCoverSuccesfully() throws Exception
        {
            //common fields for the updated and the result we expect
            String updatedName = "Test";
            String updatedType = String.valueOf(CoverType.MEDICAL);
            BigDecimal updatedLimit = new BigDecimal(10);
            String updatedDescription = "Test Description";

            CoverDto updatedCoverDto = coverDto.toBuilder()
                    .name(updatedName)
                    .limit(updatedLimit)
                    .type(updatedType)
                    .description(updatedDescription)
                    .build();

            mockMvc.perform(put("/api/covers/{id}", savedCover.getId())
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(updatedCoverDto)))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.id").isNumber())
                    .andExpect(jsonPath("$.name").value(updatedName))
                    .andExpect(jsonPath("$.type").value(updatedType))
                    .andExpect(jsonPath("$.limit").value(updatedLimit))
                    .andExpect(jsonPath("$.description").value(updatedDescription));
        }

        @DisplayName("Should Throw 404 when a cover with a non existing id is given to the database")
        @Test
        void shouldThrowExceptionWhenCoverNotFound() throws Exception
        {
            //giving 0 as the id start from 1
            Long wrongId = 0L;

            mockMvc.perform(put("/api/covers/{id}", wrongId)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(coverDto)))// doesnt matter which coverDto
                    .andExpect(status().isNotFound());
        }

        @DisplayName("Should Throw 409 when a cover with an existing name is given")
        @Test
        void shouldThrowExceptionWhenDuplicateName() throws Exception
        {
            Cover cover = CoverMapper.mapToCover(coverDto);
            cover.setNormalizedName(NameNormalizer.normalizeName(coverDto.getName()));
            cover.setProduct(savedProduct);  //add foreign key
            Cover sameNameCover = coverRepository.save(cover);

            mockMvc.perform(put("/api/covers/{id}", sameNameCover.getId())
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(coverDto)))
                    .andExpect(status().isConflict());
        }
    }

    @Nested
    class deleteCoverTests
    {
        @Test
        void shouldDeleteCoverSuccessfully() throws Exception
        {
            mockMvc.perform(delete("/api/covers/{id}", savedCover.getId())
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(coverDto)))
                    .andExpect(status().isOk());
        }

        @DisplayName("Should Throw 404 when a cover with a non existing id is given to the database")
        @Test
        void shouldThrowExceptionWhenCoverNotFound() throws Exception
        {
            //giving 0 as the id start from 1
            Long wrongId = 0L;

            mockMvc.perform(delete("/api/covers/{id}", wrongId)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(coverDto)))// doesnt matter which coverDto
                    .andExpect(status().isNotFound());
        }
    }
}