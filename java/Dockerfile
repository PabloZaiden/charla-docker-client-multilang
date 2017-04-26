FROM openjdk:8-alpine

WORKDIR /app

COPY ./gradle /app/gradle
COPY ./gradlew /app/gradlew
COPY ./build.gradle /app/build.gradle
COPY ./src/main/java/dockerapi/App.java /app/src/main/java/dockerapi/App.java
RUN ["/app/gradlew", "build"]

COPY ./src /app/src
RUN ["/app/gradlew", "clean"]
RUN ["/app/gradlew", "build"]

CMD ["./gradlew","bootRun"]

EXPOSE 80
