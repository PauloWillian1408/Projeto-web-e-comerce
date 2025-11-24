<?php
// auth.php - Lógica de Registro e login

require_once 'utils.php';

/**
 * Registra um novo usuário.
 * Rota: POST /auth/register
 * Payload: { "nome": "...", "email": "...", "senha": "..." }
 * @param PDO $pdo A conexão PDO.
 */
function register_user(PDO $pdo) {
    $data = json_decode(file_get_contents("php://input"), true);

    // Ajuste: Verifica 'nome' em vez de 'nome_usuario'
    if (!isset($data['nome']) || !isset($data['email']) || !isset($data['senha'])) {
        send_json_response(['error' => 'Dados incompletos: nome, email e senha são obrigatórios.'], 400);
        return;
    }

    // Ajuste: Mapeia 'nome' para 'nome_usuario' para o banco
    $nome = trim($data['nome']);
    $email = trim($data['email']);
    $senha = $data['senha'];

    if (empty($nome) || empty($email) || empty($senha)) {
        send_json_response(['error' => 'Todos os campos devem ser preenchidos.'], 400);
        return;
    }

    // 1. Hash da senha
    $hashed_password = password_hash($senha, PASSWORD_DEFAULT);

    // 2. Criação de token inicial (opcional, será atualizado no login)
    $token = generate_token();

    try {
        // 3. Insere o usuário (usa 'nome_usuario' no banco)
        $stmt = $pdo->prepare("INSERT INTO usuarios (nome_usuario, email, senha, token) VALUES (?, ?, ?, ?)");
        $stmt->execute([$nome, $email, $hashed_password, $token]);

        send_json_response([
            'message' => 'Usuário registrado com sucesso!',
            'user_id' => $pdo->lastInsertId(),
            'token' => $token,
            'nome_usuario' => $nome,
            'email' => $email
        ], 201);

    } catch (\PDOException $e) {
        if ($e->getCode() == '23000') { // Código de erro para violação de UNIQUE key (email duplicado)
            send_json_response(['error' => 'E-mail já cadastrado.'], 409);
        } else {
            // Em produção, você registraria $e->getMessage() em um log.
            send_json_response(['error' => 'Erro ao registrar usuário.'], 500);
        }
    }
}

/**
 * Realiza o login do usuário.
 * Rota: POST /auth/login
 * Payload: { "email": "...", "senha": "..." }
 * @param PDO $pdo A conexão PDO.
 */
function login_user(PDO $pdo) {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data['email']) || !isset($data['senha'])) {
        send_json_response(['error' => 'Email e senha são obrigatórios.'], 400);
        return;
    }

    $email = trim($data['email']);
    $senha = $data['senha'];

    // 1. Busca o usuário pelo email
    $stmt = $pdo->prepare("SELECT id_usuario, nome_usuario, senha FROM usuarios WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    if (!$user) {
        send_json_response(['error' => 'Email ou senha incorretos.'], 401);
        return;
    }

    // 2. Verifica a senha
    if (!password_verify($senha, $user['senha'])) {
        send_json_response(['error' => 'Email ou senha incorretos.'], 401);
        return;
    }

    // 3. Gera um novo token e atualiza o banco de dados
    $new_token = generate_token();

    try {
        $stmt = $pdo->prepare("UPDATE usuarios SET token = ? WHERE id_usuario = ?");
        $stmt->execute([$new_token, $user['id_usuario']]);

        // 4. Resposta de sucesso
        send_json_response([
            'message' => 'login realizado com sucesso!',
            'token' => $new_token,
            'user_id' => $user['id_usuario'],
            'nome_usuario' => $user['nome_usuario']
        ]);
    } catch (\PDOException $e) {
        send_json_response(['error' => 'Erro ao gerar o token de sessão.'], 500);
    }
}

/**
 * Valida um token e retorna o user_id se válido.
 * @param PDO $pdo A conexão PDO.
 * @param string $token O token a ser validado.
 * @return int|false Retorna o user_id se válido, ou false se inválido.
 */
function validateToken(PDO $pdo, $token) {
    if (empty($token)) {
        return false;
    }

    try {
        $stmt = $pdo->prepare("SELECT id_usuario FROM usuarios WHERE token = ?");
        $stmt->execute([$token]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        return $user ? $user['id_usuario'] : false;
    } catch (\PDOException $e) {
        // Em produção, registre o erro em um log
        return false;
    }
}
?>