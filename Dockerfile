FROM node:6.15.1

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
ENV NODE_ENV=production
ENV APP_ENV=production

RUN npm install
#RUN npm run dist

# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .



CMD [ "npm run dist && npm run start" ]
