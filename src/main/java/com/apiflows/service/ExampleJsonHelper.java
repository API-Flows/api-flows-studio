package com.apiflows.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import io.swagger.v3.core.util.Json;
import io.swagger.v3.oas.models.examples.Example;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.Map;

public class ExampleJsonHelper {

    private final Logger log = LoggerFactory.getLogger(WorkflowService.class);

    public static final String JSON_ESCAPE_DOUBLE_QUOTE = "\"";
    public static final String JSON_ESCAPE_NEW_LINE = "\n";

    String getJsonFromExample(Example example) {
        String ret = "";

        if (example == null) {
            return ret;
        }

        if (example.getValue() instanceof ObjectNode) {
            ret = convertToJson((ObjectNode) example.getValue());
        } else if (example.getValue() instanceof LinkedHashMap) {
            ret = convertToJson((LinkedHashMap) example.getValue());
        }

        return ret;
    }

    public String formatJson(String json) {

        ObjectMapper objectMapper = new ObjectMapper();

        try {
            // convert to JSON object and prettify
            JsonNode actualObj = objectMapper.readTree(json);
            json = Json.pretty(actualObj);

        } catch (JsonProcessingException e) {
            log.warn("Error formatting JSON", e);
            json = "";
        }

        return json;
    }

    // array of attributes from JSON payload (ignore commas within quotes)
    String[] getAttributes(String json) {
        return json.split(",(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)", -1);
    }

    String convertToJson(ObjectNode objectNode) {
        return formatJson(objectNode.toString());
    }

    // convert to JSON (string) escaping and formatting
    String convertToJson(LinkedHashMap<String, Object> linkedHashMap) {
        String ret = "";

        return traverseMap(linkedHashMap, ret);
    }

    // traverse recursively
    private String traverseMap(LinkedHashMap<String, Object> linkedHashMap, String ret) {

        ret = ret + "{" + JSON_ESCAPE_NEW_LINE + " ";

        int numVars = linkedHashMap.entrySet().size();
        int counter = 1;

        for (Map.Entry<String, Object> mapElement : linkedHashMap.entrySet()) {
            String key = mapElement.getKey();
            Object value = mapElement.getValue();

            if (value instanceof String) {
                ret = ret + JSON_ESCAPE_DOUBLE_QUOTE + key + JSON_ESCAPE_DOUBLE_QUOTE + ": " + JSON_ESCAPE_DOUBLE_QUOTE + value + JSON_ESCAPE_DOUBLE_QUOTE;
            } else if (value instanceof Boolean) {
                ret = ret + JSON_ESCAPE_DOUBLE_QUOTE + key + JSON_ESCAPE_DOUBLE_QUOTE + ": " + value;
            } else if (value instanceof Integer) {
                ret = ret + JSON_ESCAPE_DOUBLE_QUOTE + key + JSON_ESCAPE_DOUBLE_QUOTE + ": " + value;
            } else if (value instanceof LinkedHashMap) {
                String in = ret + JSON_ESCAPE_DOUBLE_QUOTE + key + JSON_ESCAPE_DOUBLE_QUOTE + ": ";
                ret = traverseMap(((LinkedHashMap<String, Object>) value), in);
            } else if (value instanceof ArrayList<?>) {
                ret = ret + JSON_ESCAPE_DOUBLE_QUOTE + key + JSON_ESCAPE_DOUBLE_QUOTE + ": " + getJsonArray((ArrayList<Object>) value);
            } else {
                log.warn("Value type unrecognised: " + value.getClass());
            }

            if (counter < numVars) {
                // add comma unless last attribute
                ret = ret + "," + JSON_ESCAPE_NEW_LINE + " ";
            }
            counter++;
        }

        ret = ret + JSON_ESCAPE_NEW_LINE + "}";

        return ret;
    }

    String getJsonArray(ArrayList<Object> list) {
        String ret = "";

        for(Object element: list) {
            ret = ret + JSON_ESCAPE_DOUBLE_QUOTE + element + JSON_ESCAPE_DOUBLE_QUOTE + ", ";
        }

        if(!ret.isEmpty()) {
            ret = ret.substring(0, ret.length() - 2);
        }

        return "[" + ret + "]";
    }

}
