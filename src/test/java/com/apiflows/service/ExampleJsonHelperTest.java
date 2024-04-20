package com.apiflows.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.LinkedHashMap;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class ExampleJsonHelperTest {

    @Test
    public void formatJson() {

        final String EXPECTED = "{\n  \"id\" : 1,\n  \"city\" : \"Amsterdam\"\n}";
        final String JSON = "{\"id\":1,\"city\":\"Amsterdam\"}";

        assertEquals(EXPECTED, new ExampleJsonHelper().formatJson(JSON));

    }

    @Test
    public void formatJsonIncludingCommas() {

        final String EXPECTED = "{\n  \"id\" : 1,\n  \"list\" : \"AMS,LON,ROM\"\n}";
        final String JSON = "{\"id\":1,\"list\":\"AMS,LON,ROM\"}";

        assertEquals(EXPECTED, new ExampleJsonHelper().formatJson(JSON));

    }

    @Test
    public void formatJsonWithUrl() {

        final String EXPECTED = "{\n  \"id\" : 1,\n  \"url\" : \"https://github.com\"\n}";
        final String JSON = "{\"id\": 1,\"url\": \"https://github.com\"}";

        assertEquals(EXPECTED, new ExampleJsonHelper().formatJson(JSON));

    }

    @Test
    public void getAttributesFromJson() {

        final String JSON = "{\"id\":1,\"list\":\"AMS,LON,ROM\"}";
        assertEquals(2, new ExampleJsonHelper().getAttributes(JSON).length);

    }

    @Test
    public void convertObjectNodeToJson() {

        final String EXPECTED = "{\n  \"id\" : 1,\n  \"city\" : \"Amsterdam\",\n  \"nice\" : true\n}";

        ObjectMapper mapper = new ObjectMapper();
        ObjectNode city = mapper.createObjectNode();

        city.put("id", 1);
        city.put("city", "Amsterdam");
        city.put("nice", true);

        assertEquals(EXPECTED, new ExampleJsonHelper().convertToJson(city));

    }

    @Test
    public void convertObjectNodeIncludingDoubleQuoteToJson() {

        final String EXPECTED = "{\n  \"id\" : 1,\n  \"city\" : \"it is \\\"Amsterdam\\\" \"\n}";

        ObjectMapper mapper = new ObjectMapper();
        ObjectNode city = mapper.createObjectNode();

        city.put("id", 1);
        city.put("city", "it is \"Amsterdam\" ");

        assertEquals(EXPECTED, new ExampleJsonHelper().convertToJson(city));

    }

    @Test
    public void convertLinkedHashMapToJson() {

        final String EXPECTED = "{\n \"id\": 1,\n \"city\": \"Amsterdam\"\n}";

        LinkedHashMap<String, Object> city = new LinkedHashMap<>();
        city.put("id", 1);
        city.put("city", "Amsterdam");

        assertEquals(EXPECTED, new ExampleJsonHelper().convertToJson(city));

    }

    @Test
    public void convertNestedLinkedHashMapToJson() {

        final String EXPECTED =
                "{\n " +
                        "\"id\": 1,\n \"city\": \"Amsterdam\",\n " +
                        "\"country\": {\n \"id\": 2,\n \"code\": \"NL\"\n}" +
                        "\n}";

        LinkedHashMap<String, Object> city = new LinkedHashMap<>();
        city.put("id", 1);
        city.put("city", "Amsterdam");
        LinkedHashMap<String, Object> country = new LinkedHashMap<>();
        country.put("id", 2);
        country.put("code", "NL");
        city.put("country", country);

        assertEquals(EXPECTED, new ExampleJsonHelper().convertToJson(city));
    }

    @Test
    public void convertNestedArrayListToJson() {

        final String EXPECTED =
                "{\n " +
                        "\"id\": 1,\n \"city\": \"Amsterdam\",\n " +
                        "\"tags\": [\"ams\", \"adam\"]" +
                        "\n}";

        LinkedHashMap<String, Object> city = new LinkedHashMap<>();
        city.put("id", 1);
        city.put("city", "Amsterdam");
        ArrayList<String> tags = new ArrayList<>();
        tags.add("ams");
        tags.add("adam");
        city.put("tags", tags);

        assertEquals(EXPECTED, new ExampleJsonHelper().convertToJson(city));

    }

    @Test
    public void convertNestedEmptyArrayListToJson() {

        final String EXPECTED =
                "{\n " +
                        "\"id\": 1,\n \"city\": \"Amsterdam\",\n " +
                        "\"tags\": []" +
                        "\n}";

        LinkedHashMap<String, Object> city = new LinkedHashMap<>();
        city.put("id", 1);
        city.put("city", "Amsterdam");
        ArrayList<String> tags = new ArrayList<>();
        city.put("tags", tags);

        assertEquals(EXPECTED, new ExampleJsonHelper().convertToJson(city));

    }
}
