package com.apiflows.service;

import com.apiflows.model.OperationData;
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

/**
 * OpenAPI operations
 */
public class OpenApiOperationService {

    private final Logger log = LoggerFactory.getLogger(OpenApiOperationService.class);

    Map<String, OperationData> getOperationData(List<SourceDescription> sourceDescriptions, String location) {
        Map<String, OperationData> map = new HashMap<>();

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

                        OperationData operationData = new OperationData();
                        Operation operation = null;

                        if(pathItem.getGet() != null) {
                            operationData.setHttpMethod("GET");
                            operation = pathItem.getGet();
                        } else if (pathItem.getPost() != null) {
                            operationData.setHttpMethod("POST");
                            operation = pathItem.getPost();
                        } else if (pathItem.getPatch() != null) {
                            operationData.setHttpMethod("PATCH");
                            operation = pathItem.getPatch();
                        } else if (pathItem.getPut() != null) {
                            operationData.setHttpMethod("PUT");
                            operation = pathItem.getPut();
                        } else if (pathItem.getDelete() != null) {
                            operationData.setHttpMethod("DELETE");
                            operation = pathItem.getDelete();
                        } else if (pathItem.getHead() != null) {
                            operationData.setHttpMethod("HEAD");
                            operation = pathItem.getHead();
                        } else if (pathItem.getOptions() != null) {
                            operationData.setHttpMethod("OPTIONS");
                            operation = pathItem.getOptions();
                        }

                        if(operation != null) {
                            List<OperationExample> examples = getOperationExamples(parseResult, operation);

                            operationData.setOperationExamples(examples);
                            if(examples.size() > 0) {
                                operationData.setHasOperationExamples(true);
                            }

                            map.put(operation.getOperationId(), operationData);
                        }

                    }
                }

            }
        }


        return map;
    }

    /**
     * Find OpenAPI examples for that operation
     * @param parseResult
     * @param operation
     * @return
     */
    List<OperationExample> getOperationExamples(SwaggerParseResult parseResult, Operation operation) {

            List<OperationExample> operationExamples = new ArrayList<>();

            if (operation != null && operation.getRequestBody() != null) {
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

            }

        return operationExamples;

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
