FROM node:13.12.0-alpine

# COPY package.json /tmp/package.json
# RUN cd /tmp && npm install
# RUN mkdir -p /usr/src/docker-react-sample && cp -a /tmp/node_modules /usr/src/docker-react-sample/

WORKDIR /usr/src/docker-react-sample
COPY package*.json ./
RUN npm install
# ADD package.json /tmp/package.json
# RUN cd /usr/src/docker-react-sample && npm install
COPY . .
# RUN cd /tmp && cp -a /tmp/node_modules /usr/src/docker-react-sample/

EXPOSE 3000
CMD npm start --host 0.0.0.0 --port 3000 --disableHostCheck true