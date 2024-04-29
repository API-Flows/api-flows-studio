package com.apiflows.model;

import java.util.List;

public class OperationData {

    private String httpMethod;
    private List<OperationExample> operationExamples;

    private boolean hasOperationExamples;

    public String getHttpMethod() {
        return httpMethod;
    }

    public void setHttpMethod(String httpMethod) {
        this.httpMethod = httpMethod;
    }

    public List<OperationExample> getOperationExamples() {
        return operationExamples;
    }

    public void setOperationExamples(List<OperationExample> operationExamples) {
        this.operationExamples = operationExamples;
    }

    public boolean isHasOperationExamples() {
        return hasOperationExamples;
    }

    public void setHasOperationExamples(boolean hasOperationExamples) {
        this.hasOperationExamples = hasOperationExamples;
    }
}
