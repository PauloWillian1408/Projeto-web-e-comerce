<?php
// sales.php - Lógica de Registro de Vendas/Pedidos

require_once 'utils.php';

function create_order(PDO $pdo) {
    // 1. AUTENTICAÇÃO: Obtém o ID do usuário (interrompe a execução se falhar)
    $usuario_id = authenticate_user($pdo);

    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data['items']) || !is_array($data['items']) || empty($data['items'])) {
        send_json_response(['error' => 'Carrinho vazio ou formato de itens inválido.'], 400);
        return;
    }

    $pdo->beginTransaction();
    $total_venda = 0;
    $items_to_process = [];

    // REMOVEMOS O TRY-CATCH TEMPORARIAMENTE PARA FORÇAR A EXIBIÇÃO DO ERRO FATAL

    // 2. VALIDAÇÃO DOS PRODUTOS E CÁLCULO DO TOTAL
    $items_to_process = [];
    $product_ids = array_column($data['items'], 'id_produto');
    
    if (empty($product_ids)) {
         $pdo->rollBack();
         send_json_response(['error' => 'Os IDs dos produtos são obrigatórios.'], 400);
         return;
    }

    $in_clause = implode(',', array_fill(0, count($product_ids), '?'));

    $stmt = $pdo->prepare("SELECT id_produto, preco, estoque FROM produtos WHERE id_produto IN ({$in_clause})");
    $stmt->execute($product_ids);
    $available_products = $stmt->fetchAll(PDO::FETCH_GROUP | PDO::FETCH_UNIQUE);

    foreach ($data['items'] as $item) {
        $id_produto = (int)$item['id_produto'];
        $quantidade = (int)$item['quantidade'];

        if ($quantidade <= 0) {
            $pdo->rollBack();
            send_json_response(['error' => "Quantidade inválida para o produto ID: {$id_produto}."], 400);
            return;
        }

        if (!isset($available_products[$id_produto])) {
            $pdo->rollBack();
            send_json_response(['error' => "Produto ID: {$id_produto} não encontrado."], 404);
            return;
        }

        $product = $available_products[$id_produto];

        if ($product['estoque'] < $quantidade) {
            $pdo->rollBack();
            send_json_response(['error' => "Estoque insuficiente para o produto: {$id_produto}. Disponível: {$product['estoque']}."], 400);
            return;
        }

        $subtotal = $product['preco'] * $quantidade;
        $total_venda += $subtotal;

        $items_to_process[] = [
            'id_produto' => $id_produto,
            'quantidade' => $quantidade,
            'preco_unitario' => $product['preco']
        ];
    }

    // 3. CRIAÇÃO DA VENDA (CABEÇALHO)
    $stmt_venda = $pdo->prepare("INSERT INTO vendas (usuario_id, total) VALUES (?, ?)");
    $stmt_venda->execute([$usuario_id, $total_venda]);
    $id_venda = $pdo->lastInsertId();

    // 4. INSERÇÃO DOS ITENS E ATUALIZAÇÃO DO ESTOQUE
    $stmt_item = $pdo->prepare("INSERT INTO itens_pedido (id_venda, id_produto, quantidade, preco) VALUES (?, ?, ?, ?)");
    $stmt_estoque = $pdo->prepare("UPDATE produtos SET estoque = estoque - ? WHERE id_produto = ?");

    foreach ($items_to_process as $item) {
        // Esta é a query de inserção que pode falhar devido à FOREIGN KEY
        $stmt_item->execute([
            $id_venda, 
            $item['id_produto'], 
            $item['quantidade'], 
            $item['preco_unitario']
        ]);

        $stmt_estoque->execute([$item['quantidade'], $item['id_produto']]);
    }

    // 5. COMMIT
    $pdo->commit();
    send_json_response([
        'message' => 'Pedido registrado com sucesso!',
        'id_venda' => $id_venda,
        'total' => number_format((float)$total_venda, 2, '.', '')
    ], 201);

    // REMOVEMOS O BLOCO CATCH: Qualquer PDOException aqui exibirá uma mensagem clara no navegador.
}