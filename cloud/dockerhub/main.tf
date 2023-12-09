terraform {
  required_providers {
    docker = {
      source = "kreuzwerker/docker"
    }
  }
}


provider "docker" {
}

variable "tag_version" {
  type     = string
  nullable = false
}

resource "null_resource" "markitos_es_api_docker_push" {
  provisioner "local-exec" {
    command = <<-EOT
        #!/bin/bash
        cd ../../apps/api
        docker build  --no-cache -f ../../cloud/dockerhub/Dockerfile.api -t markitosinfo/markitos.es.api:${var.tag_version} .
        docker login
        docker push markitosinfo/markitos.es.api:${var.tag_version}
      EOT
  }
}
resource "null_resource" "markitos_es_mariadb_docker_push" {
  provisioner "local-exec" {
    command = <<-EOT
        #!/bin/bash
        cp ../../docker/mariadb/all.sql .
        docker build --no-cache  -f ./Dockerfile.mariadb -t markitosinfo/markitos.es.mariadb:${var.tag_version} .
        docker login
        docker push markitosinfo/markitos.es.mariadb:${var.tag_version}
        rm all.sql
      EOT
  }
}
resource "null_resource" "markitos_es_frontend_docker_push" {
  provisioner "local-exec" {
    command = <<-EOT
        #!/bin/bash
        cd ../../apps/frontend
        docker build  --no-cache -f ../../cloud/dockerhub/Dockerfile.frontend -t markitosinfo/markitos.es.frontend:${var.tag_version} .
        docker login
        docker push markitosinfo/markitos.es.frontend:${var.tag_version}
      EOT
  }
}
