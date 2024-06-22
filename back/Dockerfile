# docker image is the blueprint of the container
# docker container is the instance of the image
# image consists of different ordered layers (instructions)

# runtime image can be found in the docker hub https://hub.docker.com/
# "FROM" will load the image from the docker hub or local registry if it is already downloaded
FROM node:22-slim
WORKDIR /app
COPY ./build ./back
WORKDIR /app/back  
RUN npm install
# EXPOSE 4006
CMD ["node", "index.js"]
