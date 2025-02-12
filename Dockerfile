# Using Node.js Alpine as base image
FROM node:18-alpine

# Setting working directory
WORKDIR /app

# Copying package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copying application files
COPY . .

# Exposing the port Next.js runs on
EXPOSE 3000

# Starting the application
CMD ["npm", "run", "dev"]
