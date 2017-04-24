FROM openjdk:8-alpine

COPY . /app
WORKDIR /app
RUN ["/app/gradlew", "build"]

CMD ["./gradlew","bootRun"]

EXPOSE 80
