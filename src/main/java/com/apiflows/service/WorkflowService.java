package com.apiflows.service;

import com.apiflows.exception.InvalidContentException;
import com.apiflows.exception.UnexpectedErrorException;
import com.apiflows.model.Info;
import com.apiflows.model.WorkflowsSpecificationView;
import com.apiflows.parser.OpenAPIWorkflowParser;
import com.apiflows.parser.OpenAPIWorkflowParserResult;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.dataformat.yaml.YAMLFactory;
import com.fasterxml.jackson.dataformat.yaml.YAMLGenerator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class WorkflowService {

    private final Logger log = LoggerFactory.getLogger(WorkflowService.class);

    @Autowired
    private FileService fileService;

    private final OpenAPIWorkflowParser parser = new OpenAPIWorkflowParser();

    public WorkflowsSpecificationView getFromUrl(String url) {

        String content;

        if(url.startsWith("file://")) {
            content = getFileService().getFromFile(url);
        } else {
            content = getFileService().call(url);
        }

        if (!getFileService().isValidJson(content) && !getFileService().isValidYaml(content)) {
            log.error("File must be valid JSON or YAML file: " + url);
            throw new InvalidContentException("File must be a valid JSON or YAML file");
        }

        OpenAPIWorkflowParserResult result = null;

        try {
            result = parse(url);
        } catch (Exception e) {
            log.error("Unexpected error", e);
            throw new UnexpectedErrorException();
        }

        if (result == null || result.getOpenAPIWorkflow() == null) {
            log.error("Unexpected error: openAPIWorkflow is null");
            throw new UnexpectedErrorException();
        }

        WorkflowsSpecificationView workflowsSpecificationView = new WorkflowsSpecificationView(result);
        workflowsSpecificationView.setComponentsAsString(getComponents(result));
        workflowsSpecificationView.setOperationExamples(new OpenApiExampleService().getOperationExamples(result.getOpenAPIWorkflow().getSourceDescriptions(), result.getLocation()));

        if (result.getOpenAPIWorkflow() != null && result.getOpenAPIWorkflow().getInfo() != null) {
            Info info = result.getOpenAPIWorkflow().getInfo();
            log.info("Loaded '{} ({})'", info.getTitle(), info.getVersion());
        }


        return workflowsSpecificationView;
    }

    public WorkflowsSpecificationView getFromContent(String content) {

        OpenAPIWorkflowParserResult result = null;

        try {
            result = parse(content);
        } catch (Exception e) {
            log.error("Unexpected error", e);
            throw new UnexpectedErrorException();
        }

        if (result == null || result.getOpenAPIWorkflow() == null) {
            log.error("Unexpected error: openAPIWorkflow is null");
            throw new UnexpectedErrorException();
        }

        WorkflowsSpecificationView workflowsSpecificationView = new WorkflowsSpecificationView(result);
        workflowsSpecificationView.setComponentsAsString(getComponents(result));
        workflowsSpecificationView.setOperationExamples(new OpenApiExampleService().getOperationExamples(result.getOpenAPIWorkflow().getSourceDescriptions(), result.getLocation()));


        if (result.getOpenAPIWorkflow() != null && result.getOpenAPIWorkflow().getInfo() != null) {
            Info info = result.getOpenAPIWorkflow().getInfo();
            log.info("Loaded '{} ({})'", info.getTitle(), info.getVersion());
        }


        return workflowsSpecificationView;
    }

    private OpenAPIWorkflowParserResult parse(String input) {

        OpenAPIWorkflowParserResult result = parser.parse(input);

        if (!result.isValid()) {
            log.warn("Error while parsing {}", input);
            log.warn("Errors {}", result.getErrors());
        }

        return result;

    }

    private String getComponents(OpenAPIWorkflowParserResult openAPIWorkflowParserResult) {

        String components = null;

        if (openAPIWorkflowParserResult.getOpenAPIWorkflow() != null) {
            try {
                ObjectMapper objectMapper = getObjectMapper(openAPIWorkflowParserResult.isJson());

                JsonNode rootNode = objectMapper.readTree(openAPIWorkflowParserResult.getContent());

                JsonNode componentsNode = rootNode.path("components");
                if (!componentsNode.isMissingNode()) {
                    components = objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(componentsNode);
                }
            } catch (IOException e) {
                log.error(e.getMessage(), e);
            }
        }

        return components;

    }

    private ObjectMapper getObjectMapper(boolean json) {
        ObjectMapper objectMapper = null;
        if (json) {
            objectMapper = new ObjectMapper();
        } else {
            YAMLFactory yamlFactory = new YAMLFactory();
            yamlFactory.disable(YAMLGenerator.Feature.WRITE_DOC_START_MARKER);
            objectMapper = new ObjectMapper(yamlFactory);
        }

        objectMapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
        objectMapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
        objectMapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        objectMapper.enable(SerializationFeature.INDENT_OUTPUT);

        return objectMapper;
    }

    public FileService getFileService() {
        return fileService;
    }

    public void setFileService(FileService fileService) {
        this.fileService = fileService;
    }
}
