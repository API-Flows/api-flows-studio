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

    public WorkflowsSpecificationView get(String url) {


        OpenAPIWorkflow openAPIWorkflow = parse(url);

        WorkflowsSpecificationView workflowsSpecificationView = new WorkflowsSpecificationView(openAPIWorkflow);

        return workflowsSpecificationView;
    }

    private OpenAPIWorkflow parse(String url) {

        OpenAPIWorkflowParserResult result = parser.parse(url);

        if(!result.isValid()) {
            log.warn("Error while parsing {}", url );
        }

        return result.getOpenAPIWorkflow();

    }
}
