FROM public.ecr.aws/docker/library/node:18
RUN npm i -g @nestjs/cli
WORKDIR /api
COPY . .
RUN npm install
CMD ["npm", "start"]