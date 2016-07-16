#!/bin/bash -e

docker run -d \
	-p 80:8000 \
	-e NODE_ENV=production \
	-e DB=mysql://pgstatus:W23Sgx4kTK3tA6Fg@pg.cc9kfsiqa2wn.eu-west-1.rds.amazonaws.com/pgstatus \
	pg_web
