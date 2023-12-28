package com.apiflows.controller;

import com.apiflows.service.WorkflowService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
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


}
