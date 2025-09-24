# Stage 1: Build Angular app
#Node image to user v22
FROM node:22 AS build

# Set working directory inside container
WORKDIR /app

# App Env
ARG APP_ENVIRONMENT=development

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the project files
COPY . .

# Build Angular app for production
RUN npm run "$APP_ENVIRONMENT"

# Stage 2: Run the app with Nginx layer
FROM nginx:alpine
COPY --from=build /app/dist/first-ng-app/browser /usr/share/nginx/html
# Copy built Angular dist into Nginx default folder
COPY robots.txt /usr/share/nginx/html/browser
# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf
# Copy our nginx config
COPY nginx/config.conf /etc/nginx/conf.d
# Exposing port for the app
EXPOSE 80
# Start Nginx in foreground mode
CMD ["nginx", "-g", "daemon off;"]
