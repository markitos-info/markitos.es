#:{.".}:>----------------------------------
#:{.".}:>----- startof.backend ------------
#:{.".}:>----------------------------------
start:
	bash ./docker/bin/start.sh &
stop:
	bash ./docker/bin/stop.sh
restart:
	bash ./docker/bin/stop.sh ; bash ./docker/bin/start.sh &
apish:
	bash ./docker/bin/apish.sh
frontendsh:
	bash ./docker/bin/frontendsh.sh
mariadbsh:
	bash ./docker/bin/mariadbsh.sh
recreatedb:
	bash ./docker/bin/recreatedb.sh
populatedb:
	bash ./docker/bin/populatedb.sh
dumpdb:
	bash ./docker/bin/dumpdb.sh
test:
	bash ./docker/bin/testsh.sh
format:
	bash ./docker/bin/format.sh
lint:
	bash ./docker/bin/lint.sh
#:{.".}:>----------------------------------
#:{.".}:>----- endof.backend --------------
#:{.".}:>----------------------------------


#:{.".}:>----------------------------------------
#:{.".}:>----- startof.docker.images ------------
#:{.".}:>----- use:
#:{.".}:>----- TAG=0.0.1 make cloud.docker.plan
#:{.".}:>----- TAG=0.0.1 make cloud.docker.push
#:{.".}:>----------------------------------------
cloud.docker.init:
	cd cloud/dockerhub && terraform init
cloud.docker.plan:
	cd cloud/dockerhub && terraform plan  -var "tag_version=$(TAG)"
cloud.docker.push:
	cd cloud/dockerhub && terraform apply --auto-approve -var "tag_version=$(TAG)" && terraform destroy  -var "tag_version=$(TAG)" --auto-approve
#:{.".}:>----------------------------------------
#:{.".}:>----- endof.docker.images ------------
#:{.".}:>----------------------------------------
