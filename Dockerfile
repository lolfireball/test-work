FROM node:8.9.4

WORKDIR /home/lolfireball/Documents/test/app

COPY . . 

EXPOSE 8081

CMD [ "node", "AllCash.js" ]