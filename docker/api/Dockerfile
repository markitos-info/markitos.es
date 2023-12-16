FROM node:20-alpine

# RUN addgroup app && adduser -S -G app app
# RUN mkdir /app && chown app:app /app
# USER app

WORKDIR /app
RUN chown -R node:node /app

COPY --chown=node:node package*.json ./
RUN npm install -g npm@10.2.5 && npm install
COPY --chown=node:node . .

# USER root
# RUN chown -R app:app /app
# USER app

USER node
ENV PATH /app/node_modules/.bin:$PATH


CMD [ "npm", "run", "dev" ]