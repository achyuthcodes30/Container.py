FROM node:21-alpine3.19
WORKDIR /app
COPY package*.json /app
RUN npm ci
COPY . /app
EXPOSE 8080
CMD ["npm","run","dev"]