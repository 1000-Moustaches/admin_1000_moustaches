# Use the official Node.js image as a base
FROM node:20-alpine 

# Set the working directory to /app
WORKDIR /usr/app

# Change ownership of the working directory to node user
RUN chown -R node:node /usr/app

# Set the default user
USER node 

# Copy server code
COPY --chown=node:node ./front /usr/app/front

# Set working directory to server for npm operations
WORKDIR /usr/app/front

RUN npm install

# Arguments 
ARG VITE_API_URL
ARG VITE_FIREBASE_API_KEY
ARG VITE_FIREBASE_AUTH_DOMAIN
ARG VITE_FIREBASE_DATABASE_URL
ARG VITE_FIREBASE_PROJECT_ID
ARG VITE_FIREBASE_STORAGE_BUCKET
ARG VITE_FIREBASE_MESSAGE_SENDER_ID
ARG VITE_FIREBASE_APP_ID
ARG VITE_FIREBASE_MESUREMENT_ID
ARG VITE_GEOAPPIFY_API_KEY


# Set environment variables from arguments for the new user
ENV VITE_API_URL=${VITE_API_URL}
ENV VITE_FIREBASE_API_KEY=${VITE_FIREBASE_API_KEY}
ENV VITE_FIREBASE_AUTH_DOMAIN=${VITE_FIREBASE_AUTH_DOMAIN}
ENV VITE_FIREBASE_DATABASE_URL=${VITE_FIREBASE_DATABASE_URL}
ENV VITE_FIREBASE_PROJECT_ID=${VITE_FIREBASE_PROJECT_ID}
ENV VITE_FIREBASE_STORAGE_BUCKET=${VITE_FIREBASE_STORAGE_BUCKET}
ENV VITE_FIREBASE_MESSAGE_SENDER_ID=${VITE_FIREBASE_MESSAGE_SENDER_ID}
ENV VITE_FIREBASE_APP_ID=${VITE_FIREBASE_APP_ID}
ENV VITE_FIREBASE_MESUREMENT_ID=${VITE_FIREBASE_MESUREMENT_ID}
ENV VITE_GEOAPPIFY_API_KEY=${VITE_GEOAPPIFY_API_KEY}

# Build
RUN ["npm", "run", "build"]

# Go back to the project root for Firebase commands
WORKDIR /usr/app

EXPOSE 5173

# Start the firebase emulators
CMD ["npm", "--prefix", "front", "run", "start:dev"]