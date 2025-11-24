<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Ajuste para produção (ex.: seu domínio)
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

require_once 'config.php'; // Caminho para config.php
require_once 'auth.php'; // Caminho para auth.php (agora inclui validateToken)
require_once 'utils.php'; // Para send_json_response (se necessário, mas aqui uso echo json_encode)

$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);

// Valida o token e obtém user_id
$headers = getallheaders();
$authHeader = isset($headers['Authorization']) ? $headers['Authorization'] : '';
if (strpos($authHeader, 'Bearer ') !== 0) {
    http_response_code(401);
    echo json_encode(['error' => 'Token ausente ou inválido']);
    exit;
}
$token = str_replace('Bearer ', '', $authHeader);
$user_id = validateToken($pdo, $token); // Usa a função do auth.php
if (!$user_id) {
    http_response_code(401);
    echo json_encode(['error' => 'Token inválido']);
    exit;
}

try {
    switch ($method) {
        case 'GET':
            // Buscar itens do carrinho
            $stmt = $pdo->prepare("
                SELECT c.id_produto, p.nome_produto, p.preco, p.imagem, c.quantidade
                FROM carrinho c
                JOIN produtos p ON c.id_produto = p.id_produto
                WHERE c.usuario_id = ?
            ");
            $stmt->execute([$user_id]);
            $cart = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($cart);
            break;

        case 'POST':
            // Adicionar item ao carrinho
            $id_produto = $input['id_produto'] ?? null;
            $quantidade = $input['quantidade'] ?? 1;

            if (!$id_produto || !is_numeric($quantidade) || $quantidade < 1) {
                http_response_code(400);
                echo json_encode(['error' => 'Dados inválidos']);
                exit;
            }

            // Verifica estoque
            $stmt = $pdo->prepare("SELECT estoque FROM produtos WHERE id_produto = ?");
            $stmt->execute([$id_produto]);
            $produto = $stmt->fetch(PDO::FETCH_ASSOC);
            if (!$produto || $produto['estoque'] < $quantidade) {
                http_response_code(400);
                echo json_encode(['error' => 'Estoque insuficiente']);
                exit;
            }

            // Insere ou atualiza (incrementa quantidade se já existe)
            $stmt = $pdo->prepare("
                INSERT INTO carrinho (usuario_id, id_produto, quantidade)
                VALUES (?, ?, ?)
                ON DUPLICATE KEY UPDATE quantidade = quantidade + VALUES(quantidade)
            ");
            $stmt->execute([$user_id, $id_produto, $quantidade]);
            echo json_encode(['success' => 'Item adicionado ao carrinho']);
            break;

        case 'PUT':
            // Atualizar quantidade de um item
            $id_produto = $input['id_produto'] ?? null;
            $quantidade = $input['quantidade'] ?? null;

            if (!$id_produto || !is_numeric($quantidade) || $quantidade < 0) {
                http_response_code(400);
                echo json_encode(['error' => 'Dados inválidos']);
                exit;
            }

            // Verifica estoque se quantidade > 0
            if ($quantidade > 0) {
                $stmt = $pdo->prepare("SELECT estoque FROM produtos WHERE id_produto = ?");
                $stmt->execute([$id_produto]);
                $produto = $stmt->fetch(PDO::FETCH_ASSOC);
                if (!$produto || $produto['estoque'] < $quantidade) {
                    http_response_code(400);
                    echo json_encode(['error' => 'Estoque insuficiente']);
                    exit;
                }
            }

            // Atualiza ou remove se quantidade = 0
            if ($quantidade == 0) {
                $stmt = $pdo->prepare("DELETE FROM carrinho WHERE usuario_id = ? AND id_produto = ?");
                $stmt->execute([$user_id, $id_produto]);
            } else {
                $stmt = $pdo->prepare("UPDATE carrinho SET quantidade = ? WHERE usuario_id = ? AND id_produto = ?");
                $stmt->execute([$quantidade, $user_id, $id_produto]);
            }
            echo json_encode(['success' => 'Item atualizado']);
            break;

        case 'DELETE':
            // Remover item do carrinho
            $id_produto = $input['id_produto'] ?? null;

            if (!$id_produto) {
                http_response_code(400);
                echo json_encode(['error' => 'ID do produto necessário']);
                exit;
            }

            $stmt = $pdo->prepare("DELETE FROM carrinho WHERE usuario_id = ? AND id_produto = ?");
            $stmt->execute([$user_id, $id_produto]);
            echo json_encode(['success' => 'Item removido']);
            break;

        default:
            http_response_code(405);
            echo json_encode(['error' => 'Método não permitido']);
            break;
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Erro no banco de dados: ' . $e->getMessage()]);
}
?>
