FROM node:16

# Working dir
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./

RUN npm install
# prod:
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "node", "server.js" ]
