package com.apiflows.controller;

import com.apiflows.exception.InvalidContentException;
import com.apiflows.exception.UnexpectedErrorException;
import com.apiflows.model.WorkflowsSpecificationView;
import com.apiflows.service.WorkflowService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@SpringBootTest
class WorkflowControllerTest {

    @Autowired
    WorkflowController workflowController;

    @Test
    public void testGetFromUrl() throws Exception {

        final String URL = "https://raw.githubusercontent.com/API-Flows/api-flows-studio/main/src/test/resources/pet-coupons.arazzo.yaml";

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

    @Test
    public void getFromContentWithComponents() throws Exception {
        ResponseEntity<WorkflowsSpecificationView> responseEntity = workflowController.getFromContent(getContentFromFile());

        assertEquals(HttpStatus.ACCEPTED, responseEntity.getStatusCode());
        assertNotNull(responseEntity.getBody().getComponentsAsString());
    }

    @Test
    public void getFromUrlThrowsInvalidContentException() throws Exception {
        WorkflowService mockService = mock(WorkflowService.class);
        when(mockService.getFromUrl(anyString())).thenThrow(new InvalidContentException("invalid"));

        WorkflowController controller = new WorkflowController();
        controller.setWorkflowService(mockService);

        assertThrows(InvalidContentException.class, () -> controller.getFromUrl("https://example.com/bad.yaml"));
    }

    @Test
    public void getFromContentThrowsUnexpectedErrorException() {
        WorkflowService mockService = mock(WorkflowService.class);
        when(mockService.getFromContent(anyString())).thenThrow(new UnexpectedErrorException());

        WorkflowController controller = new WorkflowController();
        controller.setWorkflowService(mockService);

        assertThrows(UnexpectedErrorException.class, () -> controller.getFromContent("invalid content"));
    }

    String getContentFromFile() throws Exception {
        String filePath = "src/test/resources/pet-coupons.arazzo.yaml";

        Path fullPath = Paths.get(filePath).toAbsolutePath();

        byte[] encodedBytes = Files.readAllBytes(fullPath);
        return new String(encodedBytes, StandardCharsets.UTF_8);
    }
}