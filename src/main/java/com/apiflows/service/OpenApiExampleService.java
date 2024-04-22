package com.apiflows.service;

import com.apiflows.model.OperationExample;
import com.apiflows.model.SourceDescription;
import io.swagger.v3.oas.models.Operation;
import io.swagger.v3.oas.models.PathItem;
import io.swagger.v3.oas.models.examples.Example;
import io.swagger.v3.oas.models.media.Content;
import io.swagger.v3.oas.models.media.MediaType;
import io.swagger.v3.parser.OpenAPIV3Parser;
import io.swagger.v3.parser.core.models.ParseOptions;
import io.swagger.v3.parser.core.models.SwaggerParseResult;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class OpenApiExampleService {

    private final Logger log = LoggerFactory.getLogger(WorkflowService.class);

    /**
     * Retrieve OpenAPI examples of all operations
     * @param sourceDescriptions
     * @param location
     * @return
     */
    Map<String, List<OperationExample>> getOperationExamples(List<SourceDescription> sourceDescriptions, String location) {
        Map<String, List<OperationExample>> map = new HashMap<>();

        for (SourceDescription sourceDescription : sourceDescriptions) {
            if (sourceDescription.isOpenApi()) {

                ParseOptions options = new ParseOptions();
                options.setResolve(true);
                SwaggerParseResult parseResult = null;

                try {
                    if(isUrl(sourceDescription.getUrl())) {
                        parseResult = new OpenAPIV3Parser().readLocation(sourceDescription.getUrl(), null, options);
                    } else {
                        String filename = getRootFolder(location) + "/" + sourceDescription.getUrl();
                        parseResult = new OpenAPIV3Parser().readLocation(filename, null, options);

                    }
                } catch (Exception e) {
                    log.warn("Cannot find or parse source description: " + sourceDescription.getUrl(), e);
                }

                if(parseResult != null && parseResult.getOpenAPI() != null) {
                    for (PathItem pathItem : parseResult.getOpenAPI().getPaths().values()) {
                        for (Operation operation : pathItem.readOperations()) {

                            List<OperationExample> operationExamples = new ArrayList<>();

                            if (operation.getRequestBody() != null) {
                                SwaggerParseResult finalParseResult = parseResult;
                                Content content = operation.getRequestBody().getContent();

                                for (Map.Entry<String, MediaType> entry : content.entrySet()) {
                                    String key = entry.getKey();
                                    MediaType value = entry.getValue();

                                    if (key.equals("application/json")) {
                                        if (value.getExample() != null && value.getExample() instanceof Example) {
                                            operationExamples.add(getExampleAsString((Example) value.getExample()));
                                        } else if (value.getExamples() != null) {
                                            operationExamples.addAll(getExamplesAsString(value.getExamples(), finalParseResult.getOpenAPI().getComponents()));
                                        }
                                    }
                                }

                                if (!operationExamples.isEmpty()) {
                                    map.put(operation.getOperationId(), operationExamples);
                                }
                            }

                        }
                    }
                }

            }
        }

        return map;
    }

    OperationExample getExampleAsString(Example example) {
        return new OperationExample(example.getSummary(), new ExampleJsonHelper().getJsonFromExample(example));
    }

    List<OperationExample> getExamplesAsString(Map<String, Example> examples, io.swagger.v3.oas.models.Components components) {
        List<OperationExample> operationExamples = new ArrayList<>();
        for (Map.Entry<String, Example> entry : examples.entrySet()) {
            if(entry.getValue().get$ref() != null) {
                Example exampleRef = components.getExamples().get(extractExampleByName(entry.getValue().get$ref()));
                operationExamples.add(new OperationExample(entry.getKey(), new ExampleJsonHelper().getJsonFromExample(exampleRef)));
            }
        }
        return operationExamples;
    }

    String get2HrefExampleAsString(Example example) {
        if(example.get$ref() != null) {
            // get $ref

//            Example example = this.openAPI.getComponents().getExamples().get(extractExampleByName(exampleRef));
//            String exampleAsString = new ExampleJsonHelper().getJsonFromExample(example);

        }
        return new ExampleJsonHelper().getJsonFromExample(example);
    }

    String extractExampleByName(String ref) {
        return ref.substring(ref.lastIndexOf("/") + 1);
    }

    public boolean isUrl(String url) {
        return url != null && url.startsWith("http");
    }

    String getRootFolder(String location) {
        if(location == null) {
            return ".";
        } else if(isUrl(location)) {
            return location.substring(0, location.lastIndexOf("/") + 1);
        } else {
            Path filePath = Paths.get(location);

            return (filePath.getParent() != null ? filePath.getParent().toString() : null);
        }
    }


}
