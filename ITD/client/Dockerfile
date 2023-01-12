FROM node:16.17.0 AS Production

ENV NODE_ENV=dev

WORKDIR /usr/src/client

COPY package.json .
COPY package-lock.json .

RUN npm i

COPY . .

RUN npm install --global serve
RUN npm run build

CMD ["sh", "-c", "serve -p 5173 /dist"]