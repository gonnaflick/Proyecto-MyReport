FROM node:18.10

WORKDIR /app

COPY ./package*.json .

RUN npm ci

COPY . .
RUN npm run build

FROM nginx:1.23.0-alpine
EXPOSE 8080
EXPOSE 5432
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/tester /usr/share/nginx/html