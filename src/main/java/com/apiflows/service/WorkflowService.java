package com.apiflows.service;

import com.apiflows.exception.InvalidContentException;
import com.apiflows.exception.UrlNotFoundException;
import com.apiflows.model.*;
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

    private OpenAPIWorkflowParser parser = new OpenAPIWorkflowParser();

    public WorkflowsSpecificationView get(String url) {

        String content = null;

        try {
            content = getFileService().call(url);
        } catch (Exception e) {
            log.error("File not found: " + url);
            throw new UrlNotFoundException("File not found: " + url);
        }


        if(!getFileService().isValidJson(content) && !getFileService().isValidYaml(content)) {
            log.error("File must be valid JSON or YAML file: " + url);
            throw new InvalidContentException("File must be a valid JSON or YAML file");
        }

        OpenAPIWorkflowParserResult result = parse(url);

        WorkflowsSpecificationView workflowsSpecificationView = new WorkflowsSpecificationView(result);
        workflowsSpecificationView.setComponentsAsString(getComponents(result.getOpenAPIWorkflow()));

        if(result.getOpenAPIWorkflow() != null &&
            result.getOpenAPIWorkflow().getInfo() != null) {
            Info info = result.getOpenAPIWorkflow().getInfo();
            log.info("Loaded '{} ({})'", info.getTitle(), info.getVersion());
        }

        return workflowsSpecificationView;
    }

    private OpenAPIWorkflowParserResult parse(String url) {

        OpenAPIWorkflowParserResult result = parser.parse(url);

        if(!result.isValid()) {
            log.warn("Error while parsing {}", url );
        }

        return result;

    }

    private String getComponents(OpenAPIWorkflow openAPIWorkflow) {

        String components = null;

        if(openAPIWorkflow != null) {
            try {
                ObjectMapper objectMapper = getObjectMapper(openAPIWorkflow.isJson());

                JsonNode rootNode = objectMapper.readTree(openAPIWorkflow.getContent());

                JsonNode componentsNode = rootNode.path("components");
                if (componentsNode != null) {
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
            objectMapper =  new ObjectMapper();
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
