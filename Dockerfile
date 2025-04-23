# Etapa 1: Build do React
FROM node:18-alpine as react-builder

WORKDIR /app

# Copiar apenas os arquivos necessários para instalar dependências primeiro
COPY src/main/resources/static/kuarion-front-end/package*.json ./
RUN npm install

# Agora copiar o restante do código
COPY src/main/resources/static/kuarion-front-end/ ./
RUN npm run build

# Etapa 2: Build do Spring Boot
FROM maven:3.9.4-eclipse-temurin-17 as spring-builder

WORKDIR /app

# Copiar o projeto inteiro
COPY . .

# Copiar o build do React para dentro da pasta estática do Spring Boot
COPY --from=react-builder /app/build/ src/main/resources/static/

# Compilar o projeto, pulando os testes
RUN mvn clean package -DskipTests

# Etapa 3: Imagem final mais leve com apenas o JRE
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Copiar apenas o JAR final para a imagem
COPY --from=spring-builder /app/target/*.jar app.jar

# Expor a porta usada pelo Spring Boot
EXPOSE 8080

# Comando de inicialização
ENTRYPOINT ["java", "-jar", "app.jar"]
