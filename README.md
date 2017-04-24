# Script charla

## Intro
- ¿Todos saben que es docker?
    - En caso de que alguno no sepa, dar intro rapida de docker

- ¿Todos sabían que docker funciona en modo cliente/servidor?
    - Servidor, valga la redundancia, instalado en el server
    - Cliente, donde yo quiera

    - Usa un API REST para comunicarse!
    - Puede exponerse
        - En un host, por un puerto (tipicamente el `2375`)
        - Por un socket de linux (tipicamente `/var/run/docker.sock`)

    
## Ejemplos de comunicación

Que cosas puedo hacer el API de Docker?
    - Todo lo que hago con la herramienta de CLI, con `docker-compose`, `swarm`, `kubernetes`, etc...

Por ej:    
- Ejecutar y administrar containers
    ```http
    GET http`//unix:/var/run/docker.sock:/containers/json HTTP/1.1
    host: localhost
    ```
- Leer logs y metricas sobre los containers
    ```http
    GET http`//unix:/var/run/docker.sock:/containers/{id}/logs?stdout=true HTTP/1.1
    host: localhost
    ```
- Obtener y administrar imagenes
    ```http
    GET http`//unix:/var/run/docker.sock:/images/json HTTP/1.1
    host: localhost
    ```
    ```http
    GET http`//unix:/var/run/docker.sock:/images/search?term=java HTTP/1.1
    host: localhost
    ```

## Objectivo de los proximos 20 minutos

Partiendo de un frontend que no sabe nada de docker, consumir APIs en Java, NodeJS y DotNetCore para:

- Java ():
    - Listar containers
    - Obtener info de containers

- DotNetCore (`https://www.nuget.org/packages/Docker.DotNet/` o `http://stackoverflow.com/questions/40195290/how-to-connect-to-a-unix-domain-socket-in-net-core-in-c-sharp`):
    - Iniciar y parar un container
    - Ver logs

- NodeJS
    - Listar contenido de un directorio del FileSystem del container
    - Descargar un archivo
