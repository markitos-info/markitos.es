#!/bin/bash

docker exec -it `docker ps | grep markitos.api | head -n1 | awk '{print $1;}'` /var/www/vhosts/markitos/node_modules/.bin/ts-node-dev /var/www/vhosts/markitos/src/Infrastructure/Command/Youtube/main.ts