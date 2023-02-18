FROM public.ecr.aws/docker/library/node:18
WORKDIR /api
COPY . .
RUN npm install
CMD ["npm", "start"]