FROM node:16
WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
RUN yarn

COPY . .
EXPOSE 3002
CMD ["yarn", "start"]