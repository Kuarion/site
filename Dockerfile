# React
FROM node:18-alpine as react-builder

WORKDIR /app

COPY src/main/resources/static/kuarion-front-end/package*.json ./
RUN npm install

COPY src/main/resources/static/kuarion-front-end/ ./
RUN npm run build

# Spring
FROM maven:3.9.4-eclipse-temurin-17 as spring-builder

WORKDIR /app

COPY . .

COPY --from=react-builder /app/build/ src/main/resources/static/

RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

COPY --from=spring-builder /app/target/*.jar app.jar

# Server port
EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]