package com.apiflows.service;

import com.apiflows.exception.CannotFetchFileException;
import com.apiflows.exception.UnexpectedErrorException;
import com.apiflows.exception.UrlNotFoundException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.yaml.YAMLFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URL;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.file.Files;
import java.nio.file.Paths;

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
            log.warn("Invalid JSON file", e);
            return false;
        }
    }

    boolean isValidYaml(String content) {
        try {
            ObjectMapper objectMapper = new ObjectMapper(new YAMLFactory());
            JsonNode root = objectMapper.readTree(content);

            return root.get("arazzo") != null ? true : false;
        } catch (Exception e) {
            log.warn("Invalid YAML file", e);
            return false;
        }
    }

    String call(String url) {

        String res;

        try {
            URI uri = URI.create(url);

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(uri)
                    .GET()
                    .build();

            HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() == 200) {
                res = response.body();
            }
            else if (response.statusCode() == 404) {
                log.error("File not found: {} statusCode:{}", url, response.statusCode());
                throw new UrlNotFoundException("File not found: " + url);
            } else {
                log.error("Error fetching {} statusCode:{}", url, response.statusCode());
                throw new CannotFetchFileException();
            }

        } catch (IOException | InterruptedException e) {
            log.error(e.getMessage(), e);
            throw new UnexpectedErrorException();
        }

        return res;
    }

    public String getFromFile(String filepath) {
        String content;
        try {
            content = new String(Files.readAllBytes(Paths.get(filepath)));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return content;
    }

}
