FROM eclipse-temurin:21-jdk
WORKDIR /app
COPY --from=build /target/SanketHotel.jar sankethotelbooking.jar
EXPOSE 4040
ENTRYPOINT ["java", "-jar", "sankethotelbooking.jar"]
