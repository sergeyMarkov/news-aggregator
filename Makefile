#-----------------------------------------------------------
# docker
init: docker-pull docker-build docker-up
up: docker-up
down: docker-down
restart: down up

docker-pull:
	docker-compose pull
docker-build:
	docker-compose build
docker-up:
	docker-compose up -d
docker-down:
	docker-compose down --remove-orphans

bash:
	docker-compose exec php bash

#-----------------------------------------------------------
# for local
stop-local-services:
	sudo systemctl stop apache2
	sudo systemctl stop mysql

start-local-services:
	sudo systemctl start apache2
	sudo systemctl start mysql