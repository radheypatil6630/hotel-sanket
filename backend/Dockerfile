FROM maven:3.9.6-eclipse-temurin-21 AS build
COPY . .
RUN mvn clean package -DskipTests

FROM openjdk:17.0.1-jdk-slim
COPY --from=build /target/SanketHotel.jar sankethotelbooking.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","sankethotelbooking.jar"]
