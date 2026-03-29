package com.apiflows.service;

import com.apiflows.exception.InvalidContentException;
import com.apiflows.exception.UnexpectedErrorException;
import com.apiflows.model.WorkflowsSpecificationView;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class WorkflowServiceTest {

    private WorkflowService service;
    private FileService fileService;

    @BeforeEach
    void setUp() {
        service = new WorkflowService();
        fileService = mock(FileService.class);
        service.setFileService(fileService);
    }

    @Test
    void getFromContentWithValidYaml() throws Exception {
        String content = getContentFromFile("src/test/resources/pet-coupons.arazzo.yaml");

        WorkflowsSpecificationView view = service.getFromContent(content);

        assertNotNull(view);
        assertNotNull(view.getOpenAPIWorkflowParserResult());
        assertNotNull(view.getOpenAPIWorkflowParserResult().getOpenAPIWorkflow());
        assertEquals("Petstore - Apply Coupons", view.getOpenAPIWorkflowParserResult().getOpenAPIWorkflow().getInfo().getTitle());
    }

    @Test
    void getFromContentWithComponentsAsString() throws Exception {
        String content = getContentFromFile("src/test/resources/pet-coupons.arazzo.yaml");

        WorkflowsSpecificationView view = service.getFromContent(content);

        assertNotNull(view.getComponentsAsString());
    }

    @Test
    void getFromUrlWithRealFile() throws Exception {
        String filePath = Paths.get("src/test/resources/pet-coupons.arazzo.yaml").toAbsolutePath().toString();
        String content = getContentFromFile("src/test/resources/pet-coupons.arazzo.yaml");

        when(fileService.call(filePath)).thenReturn(content);
        when(fileService.isValidJson(content)).thenReturn(false);
        when(fileService.isValidYaml(content)).thenReturn(true);

        WorkflowsSpecificationView view = service.getFromUrl(filePath);

        assertNotNull(view);
        assertNotNull(view.getOpenAPIWorkflowParserResult().getOpenAPIWorkflow());
        assertEquals("Petstore - Apply Coupons", view.getOpenAPIWorkflowParserResult().getOpenAPIWorkflow().getInfo().getTitle());
    }

    @Test
    void getFromUrlThrowsInvalidContentException() {
        String url = "https://example.com/spec.yaml";
        String invalidContent = "this is not valid yaml or json content for arazzo";

        when(fileService.call(url)).thenReturn(invalidContent);
        when(fileService.isValidJson(invalidContent)).thenReturn(false);
        when(fileService.isValidYaml(invalidContent)).thenReturn(false);

        assertThrows(InvalidContentException.class, () -> service.getFromUrl(url));
    }

    @Test
    void getFromUrlThrowsUnexpectedErrorWhenContentIsNull() {
        String url = "https://example.com/spec.yaml";
        String emptyContent = "";

        when(fileService.call(url)).thenReturn(emptyContent);
        when(fileService.isValidJson(emptyContent)).thenReturn(false);
        when(fileService.isValidYaml(emptyContent)).thenReturn(false);

        assertThrows(InvalidContentException.class, () -> service.getFromUrl(url));
    }

    @Test
    void getFromContentNoComponentsWhenAbsent() throws Exception {
        String content = "arazzo: 1.0.0\n" +
                "info:\n" +
                "  title: minimal\n" +
                "  version: v1\n" +
                "sourceDescriptions:\n" +
                "  - name: petstore\n" +
                "    url: https://petstore3.swagger.io/api/v3/openapi.json\n" +
                "    type: openapi\n" +
                "workflows:\n" +
                "  - workflowId: test-workflow\n" +
                "    steps:\n" +
                "      - stepId: step-one\n" +
                "        operationId: listPets\n";

        WorkflowsSpecificationView view = service.getFromContent(content);

        assertNotNull(view);
        assertNull(view.getComponentsAsString());
    }

    private String getContentFromFile(String filePath) throws Exception {
        Path fullPath = Paths.get(filePath).toAbsolutePath();
        byte[] encodedBytes = Files.readAllBytes(fullPath);
        return new String(encodedBytes, StandardCharsets.UTF_8);
    }
}
