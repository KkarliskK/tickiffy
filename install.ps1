cd frontend && npm install && cd ..\backend && composer install && cp .env.example .env && php artisan key:generate && php artisan migrate