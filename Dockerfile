FROM public.ecr.aws/docker/library/node:18-slim
WORKDIR /api
COPY . .
RUN npm install
RUN npm run build
CMD ["npm", "run", "start:prod"]