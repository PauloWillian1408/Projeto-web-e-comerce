<?php
// utils.php - Funções utilitárias e lógica de autenticação

/**
 * Define os cabeçalhos CORS e de conteúdo e envia uma resposta JSON.
 * @param array $data Os dados a serem enviados.
 * @param int $status_code O código de status HTTP (padrão: 200).
 */
function send_json_response(array $data, int $status_code = 200) {
    header('Access-Control-Allow-Origin: *'); // Permite acesso de qualquer frontend
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    header('Content-Type: application/json');
    http_response_code($status_code);
    echo json_encode($data);
}

/**
 * Gera um token de autenticação seguro.
 * @return string O token gerado.
 */
function generate_token(): string {
    return bin2hex(random_bytes(32));
}

/**
 * Middleware de Autenticação: Verifica o token na requisição.
 * @param PDO $pdo A conexão PDO.
 * @return int O ID do usuário autenticado.
 */
function authenticate_user(PDO $pdo): int {
    $headers = getallheaders();
    $auth_header = $headers['Authorization'] ?? $headers['authorization'] ?? null;

    if (!$auth_header) {
        send_json_response(['error' => 'Acesso negado. Token não fornecido.'], 401);
        exit();
    }

    // Espera o formato "Bearer <token>"
    if (!preg_match('/Bearer\s+(.*)/', $auth_header, $matches)) {
        send_json_response(['error' => 'Formato de token inválido.'], 401);
        exit();
    }

    $token = $matches[1];

    $stmt = $pdo->prepare("SELECT id_usuario FROM usuarios WHERE token = ?");
    $stmt->execute([$token]);
    $user = $stmt->fetch();

    if (!$user) {
        send_json_response(['error' => 'Token inválido ou expirado. Faça login novamente.'], 401);
        exit();
    }

    return (int)$user['id_usuario'];
}