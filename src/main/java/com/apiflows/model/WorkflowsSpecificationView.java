package com.apiflows.model;

public class WorkflowsSpecificationView {

    private OpenAPIWorkflow openAPIWorkflow = null;

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
}
