#!/bin/bash

docker exec -it `docker ps | grep markitos.api | head -n1 | awk '{print $1;}'` bash
