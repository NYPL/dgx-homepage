FROM node:6.11.5

#RUN apt-get update && apt-get install nginx -y
#RUN apt-get update
#RUN apt-get upgrade -y

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json ./
COPY package-lock.json ./
ENV NODE_ENV=production
ENV APP_ENV=production

RUN npm cache clean
#RUN npm cache verify
#RUN npm update
RUN npm install

# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

# COPY etc/nginx/conf.d/00-proxy.conf /etc/nginx/conf.d
# RUN rm /etc/nginx/sites-enabled/default

# CMD nginx -c /etc/nginx/nginx.conf & \
# cd /usr/src/app & npm run dist && npm run start

# EXPOSE 80

RUN npm run dist

# Explicitly set port 3001 as open to requests.
EXPOSE 3001

CMD [ "npm", "start" ]