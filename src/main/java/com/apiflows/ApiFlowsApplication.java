package com.apiflows;

import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ApiFlowsApplication {


    private final Logger log = LoggerFactory.getLogger(ApiFlowsApplication.class);

    public static void main(String[] args) {
        SpringApplication.run(ApiFlowsApplication.class, args);
    }

    @PostConstruct
    public void init() {
        log.info("Starting up");
    }

}
