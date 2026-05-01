package com.safehaven.backend.exception;

import com.safehaven.backend.dto.ErrorDetailsDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import java.time.Instant;

@RestControllerAdvice
public class GlobalExceptionHandler
{
    @ExceptionHandler(DuplicateProductNameException.class)
    public ResponseEntity<ErrorDetailsDto> handleDuplicateProduct(DuplicateProductNameException ex, WebRequest request)
    {
        ErrorDetailsDto errorDetails = new ErrorDetailsDto(
                Instant.now(),
                ex.getMessage(),
                request.getDescription(false)
        );

        return new ResponseEntity<>(errorDetails, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorDetailsDto> handleResourceNotFoundException(ResourceNotFoundException ex, WebRequest request)
    {
        ErrorDetailsDto errorDetails = new ErrorDetailsDto(
                Instant.now(),
                ex.getMessage(),
                request.getDescription(false)
        );

        return new ResponseEntity<>(errorDetails, HttpStatus.NOT_FOUND);
    }
}