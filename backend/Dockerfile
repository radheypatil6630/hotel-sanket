# Use OpenJDK to run the JAR
FROM openjdk:17.0.1-jdk-slim

# Copy the built jar into the image
COPY ./out/artifacts/SanketHotel_jar/SanketHotel.jar sankethotelbooking.jar

# Expose the port your Spring Boot app runs on
EXPOSE 4040

# Run the jar
ENTRYPOINT ["java", "-jar", "sankethotelbooking.jar"]
