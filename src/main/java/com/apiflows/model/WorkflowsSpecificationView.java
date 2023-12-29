package com.apiflows.model;

public class WorkflowsSpecificationView {

    private OpenAPIWorkflow openAPIWorkflow = null;
    private String componentsAsString = null;

    public WorkflowsSpecificationView() {
    }

    public WorkflowsSpecificationView(OpenAPIWorkflow openAPIWorkflow) {
        this.openAPIWorkflow = openAPIWorkflow;
    }

    public OpenAPIWorkflow getOpenAPIWorkflow() {
        return openAPIWorkflow;
    }

    public void setOpenAPIWorkflow(OpenAPIWorkflow openAPIWorkflow) {
        this.openAPIWorkflow = openAPIWorkflow;
    }

    public String getComponentsAsString() {
        return componentsAsString;
    }

    public void setComponentsAsString(String componentsAsString) {
        this.componentsAsString = componentsAsString;
    }
}
