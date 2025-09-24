# ----------------------
# Stage 1: Build Angular app
# ----------------------
FROM node:20 AS build 
WORKDIR /app                # Set working directory inside container

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the project files
COPY . .

# Build Angular app for production
RUN npm run build --prod

# ----------------------
# Stage 2: Run with Nginx
# ----------------------
FROM nginx:alpine
COPY --from=build /app/dist/first-ng-app /usr/share/nginx/html
                             # Copy built Angular dist into Nginx default folder

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
                             # Start Nginx in foreground mode
