#FROM keymetrics/pm2:latest-alpine
FROM node

# Bundle APP files
COPY backend backend/
#COPY backend/package.json .
#COPY pm2.json .
WORKDIR backend

# Install app dependencies
#ENV NPM_CONFIG_LOGLEVEL warn
#RUN npm install --production

# Show current folder structure in logs
#RUN ls -al -R
EXPOSE 8080
ENTRYPOINT [ "npm", "start" ]