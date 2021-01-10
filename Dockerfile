FROM node:alpine

WORKDIR /opt/app

COPY package*.json ./
RUN yarn install

COPY . .

EXPOSE 8080

RUN yarn build
CMD ["npm", "run", "start"]