package com.apiflows.service;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class OpenApiOperationServiceTest {

    private OpenApiOperationService service = new OpenApiOperationService();

    @Test
    void isUrlWithHttps() {
        assertTrue(service.isUrl("https://example.com/spec.yaml"));
    }

    @Test
    void isUrlWithHttp() {
        assertTrue(service.isUrl("http://example.com/spec.yaml"));
    }

    @Test
    void isUrlWithRelativePath() {
        assertFalse(service.isUrl("./pet-coupons.openapi.yaml"));
    }

    @Test
    void isUrlNull() {
        assertFalse(service.isUrl(null));
    }

    @Test
    void extractExampleByName() {
        assertEquals("MyExample", service.extractExampleByName("#/components/examples/MyExample"));
    }

    @Test
    void extractExampleByNameSimplePath() {
        assertEquals("petExample", service.extractExampleByName("/components/examples/petExample"));
    }

    @Test
    void getRootFolderNull() {
        assertEquals(".", service.getRootFolder(null));
    }

    @Test
    void getRootFolderFromUrl() {
        String root = service.getRootFolder("https://example.com/api/spec.yaml");
        assertEquals("https://example.com/api/", root);
    }

    @Test
    void getRootFolderFromAbsolutePath() {
        String root = service.getRootFolder("/Users/beppe/project/spec.yaml");
        assertEquals("/Users/beppe/project", root);
    }

    @Test
    void getRootFolderFromRelativePath() {
        String root = service.getRootFolder("src/test/resources/pet-coupons.arazzo.yaml");
        assertEquals("src/test/resources", root);
    }

    @Test
    void getRootFolderNoParent() {
        String root = service.getRootFolder("spec.yaml");
        assertNull(root);
    }
}
