package com.apiflows.service;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class FileServiceTest {

    @Test
    void checkUrlExists() {
        final String URL = "https://raw.githubusercontent.com/OAI/sig-workflows/main/examples/1.0.0/pet-coupons.workflow.yaml";
        assertTrue(new FileService().checkUrlExists(URL));
    }

    @Test
    void checkUrlDoesNotExist() {
        final String URL = "https://raw.githubusercontent.com/does-not-exist";
        assertFalse(new FileService().checkUrlExists(URL));
    }

    @Test
    void checkValidJson() {
        final String CONTENT = "{\"type\": \"workflow\"}";
        assertTrue(new FileService().isValidJson(CONTENT));
    }

    @Test
    void checkInvalidJson() {
        final String CONTENT = "this is a text file";
        assertFalse(new FileService().isValidJson(CONTENT));
    }

    @Test
    void checkValidYaml() {
        final String CONTENT = "workflowsSpec: 1.0.0\n" +
                "info:\n" +
                "  title: simple\n" +
                "  version: v1\n";
        assertTrue(new FileService().isValidYaml(CONTENT));
    }

    @Test
    void checkInvalidYaml() {
        final String CONTENT = "{ invalid content";
        assertFalse(new FileService().isValidYaml(CONTENT));
    }
}