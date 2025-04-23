# Etapa 1: Build do React
FROM node:18-alpine AS react-builder

WORKDIR /app/frontend
# Copiar apenas os arquivos necessários para instalação
COPY src/main/resources/static/kuarion-front-end/package*.json ./
RUN npm install

# Copiar o restante do código fonte
COPY src/main/resources/static/kuarion-front-end/ ./

# Executar o build e mover os arquivos para local padrão do Spring Boot
RUN npm run build && \
    mkdir -p /app/react-static && \
    mv dist/* /app/react-static/

# Etapa 2: Build do Spring Boot
FROM maven:3.9.4-eclipse-temurin-21 AS spring-builder

WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline -B

COPY src ./src

# Criar diretório estático e copiar build do React
RUN mkdir -p src/main/resources/static
COPY --from=react-builder /app/react-static/ src/main/resources/static/

RUN mvn clean package -DskipTests

# Etapa 3: Imagem final
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=spring-builder /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]