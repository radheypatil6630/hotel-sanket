FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app
COPY . .
RUN ./mvnw clean package -DskipTests

FROM eclipse-temurin:21-jdk
WORKDIR /app
COPY --from=build /app/target/SanketHotel-0.0.1-SNAPSHOT.jar sankethotelbooking.jar
EXPOSE 4040
ENTRYPOINT ["java", "-jar", "sankethotelbooking.jar"]
