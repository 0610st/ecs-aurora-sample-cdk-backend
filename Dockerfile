FROM node
RUN npm i -g @nestjs/cli
WORKDIR /api
COPY . .
RUN npm install
CMD ["npm", "start"]