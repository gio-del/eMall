FROM node:16.17.0 AS Production

ENV NODE_ENV=production

WORKDIR /usr/src/server

COPY package.json .
COPY package-lock.json .

RUN npm i

COPY . .

# RUN npm run start:production

CMD ["sh", "-c", "npm run start:production"]