# Usa una imagen base de Python
FROM python:latest

# Instala tzdata para manejar zonas horarias
RUN apt-get update && \
    apt-get -y install --no-install-recommends \
    tzdata && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos de la aplicación al contenedor
COPY . /app

# Instala las dependencias
RUN pip install --no-cache-dir -r src/utils/requerimientos.txt

# Exponer el puerto en el que se ejecutará la aplicación
EXPOSE 5000

# Comando por defecto para ejecutar la aplicación
CMD ["python", "app.py"]

