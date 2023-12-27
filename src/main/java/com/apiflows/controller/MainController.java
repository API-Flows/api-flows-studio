package com.apiflows.controller;

import com.apiflows.model.FormDataDto;
import com.apiflows.model.WorkflowView;
import com.apiflows.service.WorkflowService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 *
 */
@RestController
@RequestMapping("/api/home")
public class MainController {

    private final Logger log = LoggerFactory.getLogger(MainController.class);

    @Autowired
    private WorkflowService service;

    @PostMapping("/fetch")
    ResponseEntity<WorkflowView> fetch(@RequestBody FormDataDto dto)  {
        log.info("/workflow {}", dto.getUrl());

        WorkflowView workflowView = service.getWorkflow(dto.getUrl());

        return new ResponseEntity<>(workflowView, HttpStatus.ACCEPTED);

    }

}
