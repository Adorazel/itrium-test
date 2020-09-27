# itrium-test
    
## Развёртывание
    
На сервере должны быть установлены **Docker**, **Docker Compose** и **Traefik**.

Отредактируйте файлы `docker-compose.yml` и `Dockerfile`

Выполните в консоли команду:
    
    docker-compose up -d --build
    
## Альтернативный вариант развёртывания

    npm install
    npm run client:install
    npm run client:build
    npm run start
    
## Разработка

    npm install
    npm run client:install      
    npm run client:start 