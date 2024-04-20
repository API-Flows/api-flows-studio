package com.apiflows.model;

public class OperationExample {

    public OperationExample() {
    }

    public OperationExample(String name, String example) {
        this.name = name;
        this.example = example;
    }

    private String name;
    private String example;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getExample() {
        return example;
    }

    public void setExample(String example) {
        this.example = example;
    }
}
