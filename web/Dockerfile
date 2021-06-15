FROM node:alpine

WORKDIR '/app'

COPY ./package*.json /app/
RUN npm i
COPY . .

CMD ["npm", "run", "start"]
