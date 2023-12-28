package com.apiflows.controller;

import com.apiflows.model.FormDataDto;
import com.apiflows.model.WorkflowsSpecificationView;
import com.apiflows.service.WorkflowService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 */
@RestController
@RequestMapping("/api/workflow")
public class WorkflowController {

    private final Logger log = LoggerFactory.getLogger(WorkflowController.class);

    @Autowired
    private WorkflowService workflowService;

    @PostMapping("/view")
    ResponseEntity<WorkflowsSpecificationView> view()  {

//        String url = "https://raw.githubusercontent.com/OAI/sig-workflows/main/examples/1.0.0/pet-coupons.workflow.yaml";
        String url = "./src/test/resources/simple.workflow.yaml";

        WorkflowsSpecificationView view = workflowService.get(url);

        return new ResponseEntity<>(view, HttpStatus.ACCEPTED);

    }

}
