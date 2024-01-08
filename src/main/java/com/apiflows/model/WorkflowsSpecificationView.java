package com.apiflows.model;

import com.apiflows.parser.OpenAPIWorkflowParserResult;

public class WorkflowsSpecificationView {

    private OpenAPIWorkflowParserResult openAPIWorkflowParserResult = null;
    private String componentsAsString = null;

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
}
