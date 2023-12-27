package com.apiflows.service;

import com.apiflows.model.*;
import com.apiflows.parser.OpenAPIWorkflowParser;
import com.apiflows.parser.OpenAPIWorkflowParserResult;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class WorkflowService {

    private final Logger log = LoggerFactory.getLogger(WorkflowService.class);

    private OpenAPIWorkflowParser parser = new OpenAPIWorkflowParser();

    public WorkflowView getWorkflow(String url) {

        WorkflowView workflowView = new WorkflowView();

        OpenAPIWorkflow openAPIWorkflow = parse(url);

        Workflow workflow = openAPIWorkflow.getWorkflows().get(0);

        // metadata
        workflowView.setTitle(openAPIWorkflow.getInfo().getTitle());
        workflowView.setVersion(openAPIWorkflow.getInfo().getVersion());
        workflowView.setDescription(openAPIWorkflow.getInfo().getDescription());

        if(workflow.getInputs().getProperties() != null) {
            workflowView.setInputsView(new InputsView(workflow.getInputs()));
        }

        for(Step step : workflow.getSteps()) {
            workflowView.addStepView(new StepView(step));

        }

        workflowView.setOutputsView(new OutputsView(workflow.getOutputs()));

        return workflowView;
    }

    private OpenAPIWorkflow parse(String url) {

        OpenAPIWorkflowParserResult result = parser.parse(url);

        if(!result.isValid()) {
            log.warn("Error while parsing {}", url );
        }

        return result.getOpenAPIWorkflow();

    }
}
