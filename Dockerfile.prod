FROM node:22-slim
WORKDIR /app
COPY ./back/build .
RUN npm install
COPY ./front/build .
# EXPOSE 4001
CMD ["node", "index.js"]
