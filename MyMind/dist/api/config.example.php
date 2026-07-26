<?php

return [
    'dsn' => 'mysql:host=localhost;dbname=YOUR_DATABASE;charset=utf8mb4',
    'username' => 'YOUR_DATABASE_USER',
    'password' => 'YOUR_DATABASE_PASSWORD',
    // Generate with: php -r "echo password_hash('your-password', PASSWORD_DEFAULT), PHP_EOL;"
    'app_password_hash' => 'YOUR_PASSWORD_HASH',
];
