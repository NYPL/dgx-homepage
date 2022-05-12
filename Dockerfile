FROM node:6.15.1

RUN apt-get update && apt-get install nginx -y

COPY etc/nginx/conf.d/00-proxy.conf /etc/nginx/conf.d
RUN rm /etc/nginx/conf.d/default.conf

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

CMD nginx -c /etc/nginx/nginx.conf & \
cd /usr/src/app & npm run dist && npm run start

EXPOSE 80
