package com.apiflows.model;

import com.apiflows.parser.OpenAPIWorkflowParserResult;
import io.swagger.v3.oas.models.examples.Example;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class WorkflowsSpecificationView {

    private OpenAPIWorkflowParserResult openAPIWorkflowParserResult = null;
    private String componentsAsString = null;
    private Map<String, List<OperationExample>> operationExamples = new HashMap<>();

    public WorkflowsSpecificationView() {
    }

    public WorkflowsSpecificationView(OpenAPIWorkflowParserResult openAPIWorkflowParserResult) {
        this.openAPIWorkflowParserResult = openAPIWorkflowParserResult;
    }

    public OpenAPIWorkflowParserResult getOpenAPIWorkflowParserResult() {
        return openAPIWorkflowParserResult;
    }

    public void setOpenAPIWorkflowParserResult(OpenAPIWorkflowParserResult openAPIWorkflowParserResult) {
        this.openAPIWorkflowParserResult = openAPIWorkflowParserResult;
    }

    public String getComponentsAsString() {
        return componentsAsString;
    }

    public void setComponentsAsString(String componentsAsString) {
        this.componentsAsString = componentsAsString;
    }

    public Map<String, List<OperationExample>> getOperationExamples() {
        return operationExamples;
    }

    public void setOperationExamples(Map<String, List<OperationExample>> operationExamples) {
        this.operationExamples = operationExamples;
    }
}
