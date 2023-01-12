FROM node:16.17.0 AS Production

ENV NODE_ENV=dev

WORKDIR /usr/src/client

COPY package.json .
COPY package-lock.json .

RUN npm i

COPY . .

RUN npm run build

CMD ["sh", "-c", "node index.cjs"]