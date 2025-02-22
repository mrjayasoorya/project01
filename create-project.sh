#!/bin/bash

# # Create the root directory
# mkdir my-full-stack-app
# cd my-full-stack-app

# Create postgres directory and init script
mkdir -p postgres
touch postgres/init-db.sh

# Create mongodb directory (for later use)
mkdir mongodb

# Create server directory and subdirectories
mkdir -p server/src/models server/src/routes server/src/config
touch server/src/index.js server/Dockerfile server/package.json

# Create web directory and subdirectories
mkdir -p web/pages/api web/components
touch web/Dockerfile web/package.json

# Create docker-compose.yml and .dockerignore
touch docker-compose.yml .dockerignore

# Populate files (example content - adapt as needed)

# postgres/init-db.sh (Example)
cat << EOF > postgres/init-db.sh
#!/bin/bash
set -e
psql -v ON_ERROR_STOP=1 --username "\$POSTGRES_USER" --dbname "\$POSTGRES_DB" << EOSQL
    CREATE USER myuser WITH PASSWORD 'mypassword';
    CREATE DATABASE mydatabase OWNER myuser;
    GRANT ALL PRIVILEGES ON DATABASE mydatabase TO myuser;
EOSQL
EOF
chmod +x postgres/init-db.sh


# server/src/index.js (Example)
cat << EOF > server/src/index.js
// server/src/index.js (Example - adapt as needed)
require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

// ... (Rest of your server code - PostgreSQL connection, routes, etc.)
EOF

# server/Dockerfile (Example)
cat << EOF > server/Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3001

CMD ["node", "src/index.js"]
EOF

# web/Dockerfile (Example)
cat << EOF > web/Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/.next/standalone /app/
COPY --from=builder /app/public /app/public
WORKDIR /app

EXPOSE 3000

CMD ["node", "server.js"]
EOF

# docker-compose.yml (Example)
cat << EOF > docker-compose.yml
version: "3.9"
services:
  db:
    image: postgres:15-alpine
    ports:
      - "5432:5432" # Optional for development
    environment:
      POSTGRES_USER: myuser
      POSTGRES_PASSWORD: mypassword
      POSTGRES_DB: mydatabase
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./postgres/init-db.sh:/docker-entrypoint-initdb.d/init-db.sh

  server:
    build: ./server
    ports:
      - "3001:3001"
    depends_on:
      - db
    environment:
      DATABASE_URL: postgres://myuser:mypassword@db:5432/mydatabase
    volumes:
      - ./server:/app
      - /app/node_modules
    restart: always

  web:
    build: ./web
    ports:
      - "3000:3000"
    depends_on:
      - server
    environment:
      NEXT_PUBLIC_API_URL: http://server:3001
    volumes:
      - ./web:/app
      - /app/node_modules
    restart: always

volumes:
  postgres_data:
EOF

# .dockerignore (Example)
cat << EOF > .dockerignore
node_modules
.next
.git
EOF

echo "Project structure created.  Remember to run 'npm init -y' in the server and web directories, and 'npx create-next-app .' in the web directory."