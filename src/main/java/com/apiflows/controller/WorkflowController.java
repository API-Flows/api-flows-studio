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
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
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

    @PostMapping("/url")
    ResponseEntity<WorkflowsSpecificationView> getFromUrl(@RequestBody String url) throws UnsupportedEncodingException {

        WorkflowsSpecificationView view = workflowService.getFromUrl(URLDecoder.decode(url, "UTF-8"));
        return new ResponseEntity<>(view, HttpStatus.ACCEPTED);
    }

    @PostMapping("/content")
    ResponseEntity<WorkflowsSpecificationView> getFromContent(@RequestBody String content) throws UnsupportedEncodingException {
        WorkflowsSpecificationView view = workflowService.getFromContent(content);
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

    public WorkflowService getWorkflowService() {
        return workflowService;
    }

    public void setWorkflowService(WorkflowService workflowService) {
        this.workflowService = workflowService;
    }
}
