#!	/bin/bash

docker run \
	-v $(pwd):/home/guest/ecommerce-ng2 \
	-p 8082:3000 \
	-p 8081:8080 \
	-it rlegrand/ubuntu-js-java:latest

