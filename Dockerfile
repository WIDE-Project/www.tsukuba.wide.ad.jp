# Build stage
FROM node:20-bookworm-slim AS builder

ARG ZOLA_VERSION="0.19.2"
ARG ARCH="x86_64"

RUN apt-get update && apt-get install -y --no-install-recommends wget ca-certificates tar && rm -rf /var/lib/apt/lists/*
RUN set -eux; \
    wget -O /tmp/zola.tar.gz "https://github.com/getzola/zola/releases/download/v${ZOLA_VERSION}/zola-v${ZOLA_VERSION}-${ARCH}-unknown-linux-gnu.tar.gz"; \
    tar -xzf /tmp/zola.tar.gz -C /usr/local/bin/ zola; \
    chmod +x /usr/local/bin/zola; \
    rm /tmp/zola.tar.gz

WORKDIR /app
COPY . .
RUN npm ci
RUN npm run site:build

# Run stage
FROM nginx:1.27-alpine
COPY --from=builder /app/public/ /usr/share/nginx/html/
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
