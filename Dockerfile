FROM node:16.17.0-alpine AS builder
WORKDIR /usr/app
COPY package*.json ./
RUN npm install --quiet
COPY . .

RUN npm run build

FROM nginx:alpine AS server
COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /usr/app/dist /usr/share/nginx/html

ENTRYPOINT ["nginx", "-g", "daemon off;"]
