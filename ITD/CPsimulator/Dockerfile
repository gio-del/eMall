FROM node:16.17.0 AS Production

ENV NODE_ENV=production

WORKDIR /usr/src/cpsimulator

COPY package.json .
COPY package-lock.json .

RUN npm i

COPY . .

# RUN npm run start:production

CMD ["sh", "-c", "node cp.js"]