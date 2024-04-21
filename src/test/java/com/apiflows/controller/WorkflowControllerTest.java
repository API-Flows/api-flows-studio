package com.apiflows.controller;


import com.apiflows.model.WorkflowsSpecificationView;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class WorkflowControllerTest {

    @Autowired
    WorkflowController workflowController;

    @Test
    public void testGetFromUrl() throws Exception {

        final String URL = "https://raw.githubusercontent.com/API-Flows/api-flows-studio/main/src/test/resources/pet-coupons.workflow.yaml";

        ResponseEntity<WorkflowsSpecificationView> responseEntity = workflowController.getFromUrl(URL);

        assertEquals(HttpStatus.ACCEPTED, responseEntity.getStatusCode());
        assertTrue(responseEntity.getBody().getOpenAPIWorkflowParserResult().isYaml());
    }

    @Test
    public void getFromContent() throws Exception {

        ResponseEntity<WorkflowsSpecificationView> responseEntity = workflowController.getFromContent(getContentFromFile());

        assertEquals(HttpStatus.ACCEPTED, responseEntity.getStatusCode());
        assertTrue(responseEntity.getBody().getOpenAPIWorkflowParserResult().isYaml());
    }

    String getContentFromFile() throws Exception {
        String filePath = "pet-coupons.workflow.yaml";
        byte[] encodedBytes = Files.readAllBytes(Paths.get(this.getClass().getClassLoader().getResource(filePath).toURI()));

        return new String(encodedBytes, StandardCharsets.UTF_8);
    }
}