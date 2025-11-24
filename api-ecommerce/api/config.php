<?php
// config.php - Configurações e Conexão com o Banco de Dados

// Configurações do Banco de Dados
define('DB_HOST', 'localhost'); // Mude conforme seu ambiente
define('DB_NAME', 'ecommerce'); // Nome do banco de dados fornecido
define('DB_USER', 'root');      // Usuário do banco de dados
define('DB_PASS', ''); // Senha do banco de dados

/**
 * Conecta ao banco de dados usando PDO.
 * @return PDO A instância da conexão PDO.
 */
function get_db_connection() {
    $dsn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4';
    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];

    try {
        $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
        return $pdo;
    } catch (\PDOException $e) {
        // Em um ambiente de produção, registre o erro, mas não o exiba diretamente.
        if (!function_exists('send_json_response')) {
            function send_json_response($data, $statusCode = 200) {
                header('Content-Type: application/json');
                http_response_code($statusCode);
                echo json_encode($data);
                exit();
            }
        }
        send_json_response(['error' => 'Erro de conexão com o banco de dados.'], 500);
        exit();
    }
}