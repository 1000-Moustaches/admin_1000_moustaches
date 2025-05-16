# Use the official MySQL image as a base
FROM mysql:latest

# Set the working directory to /app
WORKDIR /server

# Set the default user for the MySQL image
USER mysql

ARG DB_ROOT_PASSWORD
ARG DB_NAME
ARG DB_USER
ARG DB_PASSWORD

# Set environment variables for the new user
ENV MYSQL_ROOT_PASSWORD=${DB_ROOT_PASSWORD}
ENV MYSQL_DATABASE=${DB_NAME}
ENV MYSQL_USER=${DB_USER}
ENV MYSQL_PASSWORD=${DB_PASSWORD}

# Expose port 3306 to allow connections to the database
EXPOSE 3306

# Start the MySQL server when the container is run
CMD ["mysqld"]