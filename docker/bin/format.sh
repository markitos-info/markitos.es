#!/bin/bash

docker exec -it `docker ps | grep markitos.api | head -n1 | awk '{print $1;}'` npm run format
docker exec -it `docker ps | grep markitos.frontend | head -n1 | awk '{print $1;}'` npm run format
