# Use the official Node.js image as a base
FROM node:20-alpine 

# Install firebase-tools globally as root
RUN npm install -g firebase-tools

# Set the working directory to /app
WORKDIR /usr/app

# Change ownership of the working directory to node user
RUN chown -R node:node /usr/app

# Set the default user
USER node 

# Copy Firebase configuration files
COPY --chown=node:node ./firebase.json /usr/app/firebase.json
COPY --chown=node:node ./.firebaserc /usr/app/.firebaserc

# Copy server code
COPY --chown=node:node ./server /usr/app/server

# Set working directory to server for npm operations
WORKDIR /usr/app/server

RUN npm install

# Arguments 
ARG DB_NAME
ARG DB_USER
ARG DB_PASSWORD
ARG DB_HOST
ARG DB_PORT
ARG NODE_ENV

# Set environment variables from arguments for the new user
ENV DB_NAME=${DB_NAME}
ENV DB_USER=${DB_USER}
ENV DB_PASSWORD=${DB_PASSWORD}
ENV DB_HOST=${DB_HOST}
ENV DB_PORT=${DB_PORT}
ENV NODE_ENV=${NODE_ENV}

# Build
RUN ["npm", "run", "build:dev"]

# Go back to the project root for Firebase commands
WORKDIR /usr/app

# Expose ports for Firebase emulators
EXPOSE 5001
# Emulator Suite UI
EXPOSE 4000
# Auth emulator
EXPOSE 9099
# Firestore emulator
EXPOSE 8080
# Realtime Database emulator
EXPOSE 9000
# Storage emulator  
EXPOSE 9199
# Hosting emulator
EXPOSE 5000
# Pub/Sub emulator
EXPOSE 8085

# Start the firebase emulators
CMD ["npm", "--prefix", "server", "run", "start:dev"]