FROM maven:3.9.15-eclipse-temurin-21-noble AS build
WORKDIR /app

COPY pom.xml .

RUN echo "Downloading dependencies..."
RUN mvn dependency:go-offline -B

COPY src ./src
RUN echo "Building the application..."

# if tests fail uncomment the 1st line below and comment the 2nd
#RUN mvn clean package -DskipTests
RUN mvn clean package

FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]