package com.apiflows.exception;

public class CannotFetchFileException extends RuntimeException{

    public CannotFetchFileException() {
        super("An error has occurred. Please verify the file and try again.");
    }

    public CannotFetchFileException(String message) {
        super(message);
    }
}
