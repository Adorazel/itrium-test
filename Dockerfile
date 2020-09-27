FROM node:12-alpine as builder
WORKDIR /usr/src/itrium.adorazel.online
COPY . .
RUN npm install
RUN npm run build
EXPOSE 5000
CMD ["npm", "server"]