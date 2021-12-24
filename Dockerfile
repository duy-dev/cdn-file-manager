FROM node:14
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --global cross-env
RUN npm install
COPY . .
RUN npm run build
EXPOSE 8080
CMD ["node", "dist/main"]