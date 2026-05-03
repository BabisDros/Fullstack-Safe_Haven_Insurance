package com.safehaven.backend.controller;

import com.safehaven.backend.dto.CoverDto;
import com.safehaven.backend.entity.CoverType;
import com.safehaven.backend.entity.ProductType;
import com.safehaven.backend.service.CoverService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/covers")
public class CoverController
{

    private CoverService coverService;

    @PostMapping
    public ResponseEntity<CoverDto> createCover(@RequestBody CoverDto coverDto)
    {
        CoverDto savedCover = coverService.createCover(coverDto);
        return new ResponseEntity<>(savedCover, HttpStatus.CREATED);
    }

    @PutMapping("{id}")
    public ResponseEntity<CoverDto> updateCover(@PathVariable("id") Long id, @RequestBody CoverDto coverUpdates)
    {
        CoverDto updatedCover = coverService.updateCover(id, coverUpdates);
        return ResponseEntity.ok(updatedCover);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteCover(@PathVariable("id") Long id)
    {
        coverService.deleteCover(id);
        return ResponseEntity.ok("Cover deleted successfully");
    }

    @GetMapping("types")
    public ResponseEntity<CoverType[]> getProductTypes()
    {
        return ResponseEntity.ok(CoverType.values());
    }
}