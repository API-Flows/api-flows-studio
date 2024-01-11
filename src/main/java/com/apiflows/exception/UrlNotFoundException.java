package com.apiflows.exception;

public class UrlNotFoundException extends RuntimeException{

    public UrlNotFoundException(String message) {
        super(message);
    }
}
