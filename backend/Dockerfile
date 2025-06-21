FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests


FROM eclipse-temurin:21-jdk
WORKDIR /app
COPY --from=build /target/SanketHotel.jar sankethotelbooking.jar
EXPOSE 4040
ENTRYPOINT ["java", "-jar", "sankethotelbooking.jar"]
