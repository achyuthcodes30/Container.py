FROM node:21-alpine3.19
WORKDIR /app
COPY package*.json /app
RUN npm ci
COPY . /app
CMD ["node","app.js"]