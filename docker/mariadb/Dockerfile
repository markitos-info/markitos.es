# Usa una imagen base de MariaDB
FROM mariadb:10

# Variables de entorno para la configuración del usuario y la base de datos
ENV MYSQL_ROOT_PASSWORD=root
ENV MYSQL_DATABASE=markitos
ENV MYSQL_USER=markitos
ENV MYSQL_PASSWORD=markitos

# Puerto en el que el servicio de MariaDB estará disponible
EXPOSE 3306

# Directorio de trabajo en el contenedor
WORKDIR /app

# Copia scripts SQL de inicialización
COPY all.sql /docker-entrypoint-initdb.d/

# algunos sets
RUN sed -i  s/#bind-address=0.0.0.0/bind-address=0.0.0.0/ /etc/mysql/my.cnf
RUN sed -i  "s/= 100$/= 1000/" /etc/mysql/my.cnf

# Comando para ejecutar el servicio de MariaDB
CMD ["mysqld", "--character-set-server=utf8mb4", "--collation-server=utf8mb4_unicode_ci"]
