package com.apiflows.exception;

public class UnexpectedErrorException extends RuntimeException{

    public UnexpectedErrorException() {
        super("An error has occurred. Please verify the file and try again.");
    }

    public UnexpectedErrorException(String message) {
        super(message);
    }
}
