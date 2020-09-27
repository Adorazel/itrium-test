# itrium-test
    
## Развёртывание
    
На сервере должны быть установлены **Docker**, **Docker Compose** и **Traefik**.

Отредактируйте файл `docker-compose.yml`

    cd ./itrium-test/
    nano ./docker-compose.yml

Выполните в консоли команду:
    
    docker-compose up -d --build
    
## Альтернативный вариант развёртывания

    npm install
    npm run build
    npm run server
    
## Разработка

    npm install   
    npm run start 