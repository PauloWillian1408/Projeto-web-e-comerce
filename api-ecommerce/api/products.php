<?php
// products.php - Lógica de Categorias e Produtos

require_once 'utils.php';

/**
 * Lista todas as categorias.
 * Rota: GET /categories
 * @param PDO $pdo A conexão PDO.
 */
function get_all_categories(PDO $pdo) {
    try {
        $stmt = $pdo->query("SELECT id_categoria, nome_categoria FROM categorias ORDER BY nome_categoria");
        $categories = $stmt->fetchAll();
        send_json_response($categories);
    } catch (\PDOException $e) {
        send_json_response(['error' => 'Erro ao listar categorias.'], 500);
    }
}

/**
 * Lista todos os produtos, ou produtos por categoria.
 * Rota: GET /products (?category_id=X)
 * @param PDO $pdo A conexão PDO.
 */
function get_products(PDO $pdo) {
    $category_id = $_GET['category_id'] ?? null;
    $sql = "SELECT p.*, c.nome_categoria 
            FROM produtos p 
            LEFT JOIN categorias c ON p.categoria_id = c.id_categoria";
    $params = [];

    if ($category_id !== null && is_numeric($category_id)) {
        $sql .= " WHERE p.categoria_id = ?";
        $params[] = (int)$category_id;
    }

    $sql .= " ORDER BY p.nome_produto";

    try {
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
        $products = $stmt->fetchAll();

        // Converte preco para string para evitar problemas de precisão em JSON (opcional, mas recomendado)
        $formatted_products = array_map(function($product) {
            $product['preco'] = number_format((float)$product['preco'], 2, '.', '');
            return $product;
        }, $products);

        send_json_response($formatted_products);
    } catch (\PDOException $e) {
        send_json_response(['error' => 'Erro ao listar produtos.'], 500);
    }
}

function get_user_order_history(PDO $pdo) {
    // O histórico de pedidos exige que o usuário esteja logado
    $usuario_id = authenticate_user($pdo);

    // SQL para buscar os pedidos (vendas) e os itens de cada pedido
    $sql = "
        SELECT
            v.id_venda, v.total, v.data_pedido,
            ip.quantidade, ip.preco AS preco_unitario_vendido,
            p.nome_produto, p.imagem
        FROM vendas v
        JOIN itens_pedido ip ON v.id_venda = ip.id_venda
        JOIN produtos p ON ip.id_produto = p.id_produto
        WHERE v.usuario_id = ?
        ORDER BY v.data_pedido DESC, v.id_venda DESC
    ";

    try {
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$usuario_id]);
        $raw_history = $stmt->fetchAll();

        // Agrupa os itens por ID de Venda para retornar uma estrutura limpa
        $history = [];
        foreach ($raw_history as $item) {
            $venda_id = $item['id_venda'];

            if (!isset($history[$venda_id])) {
                $history[$venda_id] = [
                    'id_venda' => $venda_id,
                    'total' => number_format((float)$item['total'], 2, '.', ''),
                    'data_pedido' => $item['data_pedido'],
                    'itens' => []
                ];
            }

            $history[$venda_id]['itens'][] = [
                'nome_produto' => $item['nome_produto'],
                'quantidade' => (int)$item['quantidade'],
                'preco_unitario_vendido' => number_format((float)$item['preco_unitario_vendido'], 2, '.', ''),
                'imagem' => $item['imagem']
            ];
        }

        // Retorna o array de histórico (reindexado de 0)
        send_json_response(array_values($history));

    } catch (\PDOException $e) {
        send_json_response(['error' => 'Erro ao buscar histórico de pedidos.', 'details' => $e->getMessage()], 500);
    }
}