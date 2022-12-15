FROM node:16-alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm i
RUN npm run migrate
RUN npm run seed
CMD ["npm", "run", "start"]