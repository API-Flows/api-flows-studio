package com.apiflows.service;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.yaml.YAMLFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URL;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@Service
public class FileService {

    private final Logger log = LoggerFactory.getLogger(FileService.class);

    boolean checkUrlExists(String pUrl) {
        try {
            URL url = new URL(pUrl);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("HEAD");

            int responseCode = connection.getResponseCode();
            return (responseCode >= 200 && responseCode <= 299);
        } catch (Exception e) {
            return false;
        }
    }

    boolean isValidJson(String content) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.readTree(content);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    boolean isValidYaml(String content) {
        try {
            ObjectMapper objectMapper = new ObjectMapper(new YAMLFactory());
            objectMapper.readTree(content);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    String call(String url) {

        String res = null;
        try {
            URI uri = URI.create(url);

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(uri)
                    .GET()
                    .build();

            HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() == 200) {
                res = response.body();
            } else {
                log.warn("Error fetching {} statusCode:{}", url, response.statusCode());
            }
        } catch (IOException | InterruptedException e) {
            log.error(e.getMessage(), e);
            throw new RuntimeException(e);
        }

        return res;
    }

}
