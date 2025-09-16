FROM node:20-alpine AS build
WORKDIR /app
ARG VITE_API_BASE
ARG VITE_GOOGLE_API_KEY
ENV VITE_API_BASE=${VITE_API_BASE}
ENV VITE_GOOGLE_API_KEY=${VITE_GOOGLE_API_KEY}
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:1.27-alpine AS runtime
WORKDIR /usr/share/nginx/html
COPY --from=build /app/dist ./

COPY <<EOF /etc/nginx/conf.d/default.conf
server {
  listen 8080;
  server_name _;
  root   /usr/share/nginx/html;
  index  index.html;

  location / {
    try_files \$uri \$uri/ /index.html;
  }
}
EOF

EXPOSE 8080


