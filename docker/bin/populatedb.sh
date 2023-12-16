#!/bin/bash

docker exec -it `docker ps | grep markitos.api | head -n1 | awk '{print $1;}'` /app/node_modules/.bin/ts-node-dev /app/src/Infrastructure/Command/Youtube/main.ts
