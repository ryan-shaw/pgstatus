FROM node:6.3.0-slim

RUN mkdir -p /data/pgstatus

COPY src/package.json /data/pgstatus/

WORKDIR /data/pgstatus/

RUN npm install

COPY src/ /data/pgstatus/

CMD ["node", "index.js"]
