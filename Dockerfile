FROM node:6.3.0-slim

RUN mkdir -p /data/pgstatus

COPY src/package.json /data/pgstatus/

WORKDIR /data/pgstatus/

RUN npm install

CMD ["node", "index.js"]
