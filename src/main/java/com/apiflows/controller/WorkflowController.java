package com.apiflows.controller;

import com.apiflows.model.FormDataDto;
import com.apiflows.model.WorkflowsSpecificationView;
import com.apiflows.service.WorkflowService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

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
//        String url = "./src/test/resources/simple.workflow.yaml";
        String url = "./src/test/resources/pet-coupons.workflow.yaml";

        WorkflowsSpecificationView view = workflowService.get(url);

        return new ResponseEntity<>(view, HttpStatus.ACCEPTED);

    }

    @GetMapping("/get/{filePath}")
    public ResponseEntity<byte[]> getTextFile(@PathVariable String filePath) throws IOException {
        log.info(filePath);
        Resource resource = new ClassPathResource(filePath);
        Path path = Paths.get(resource.getURI());

        byte[] fileContent = Files.readAllBytes(path);

        // Set up HTTP headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.TEXT_PLAIN);
        headers.setContentDispositionFormData("attachment", "textfile.txt");

        // Return the file content as a ResponseEntity
        return ResponseEntity.ok()
                .headers(headers)
                .body(fileContent);
    }

}
