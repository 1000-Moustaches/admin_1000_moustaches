# Use the official MySQL image as a base
FROM node:20-alpine 

# Set the working directory to /app
WORKDIR .

RUN echo "$PWD"

RUN npm install

# Set the default user
USER node 

COPY --chown=node:node ./ /usr/app

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

# Expose port 5001 to allow connections to firebase
EXPOSE 5001

# Start the MySQL server when the container is run
CMD ["npm", "run", "start:dev"]