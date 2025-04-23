# Etapa 1: Build do React
FROM node:18-alpine AS react-builder

WORKDIR /app/frontend

# Copiar arquivos do frontend
COPY src/main/resources/static/kuarion-front-end/package*.json ./
RUN npm install

COPY src/main/resources/static/kuarion-front-end/ ./
RUN npm run build

# Etapa 2: Build do Spring Boot (usando Java 21 para compatibilidade com o pom.xml)
FROM maven:3.9.4-eclipse-temurin-21 AS spring-builder

WORKDIR /app

# Copiar o projeto backend (exceto o frontend que será substituído pelo build)
COPY pom.xml .
RUN mvn dependency:go-offline -B

COPY src ./src

# Remover o frontend original se existir
RUN rm -rf src/main/resources/static/kuarion-front-end

# Copiar o build do React para a pasta estática do Spring Boot
COPY --from=react-builder /app/frontend/build/ src/main/resources/static/

# Compilar o projeto
RUN mvn clean package -DskipTests

# Etapa 3: Imagem final
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

COPY --from=spring-builder /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]