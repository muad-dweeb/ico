FROM node

WORKDIR /usr/src/ico

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 80

ENTRYPOINT [ "node", "index.js" ]
