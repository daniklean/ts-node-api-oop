FROM node:18-alpine

RUN npm install -g ts-node 

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN npm i 

ENV NODE_ENV=production

RUN npm run m:gen -- app/migrations/InitDB 

RUN npm run m:run 

RUN npm run m:gen -- app/migrations/UserUpdateUniqueCascade

RUN npm run m:run 

EXPOSE 7000

CMD [ "npm", "start" ]