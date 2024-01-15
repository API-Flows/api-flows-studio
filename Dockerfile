FROM openjdk:17.0.2-jdk-slim

RUN mkdir -p /software

ADD dist/api-flows-studio.jar /software/api-flows-studio.jar

EXPOSE 8080

WORKDIR /software
CMD java -Dserver.port=$PORT $JAVA_OPTS -jar api-flows-studio.jar



