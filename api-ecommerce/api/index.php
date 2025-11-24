<?php
// index.php - Roteador Principal da API de E-commerce (Com Análise de URI)

// 1. Configurações e Utilitários
require_once 'config.php';
require_once 'utils.php';

// Habilita a exibição de erros (DESABILITAR EM PRODUÇÃO)
ini_set('display_errors', 1);
error_reporting(E_ALL);

// 2. Configura Cabeçalhos CORS para lidar com requisições OPTIONS (preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Definir os cabeçalhos necessários para o CORS
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    http_response_code(204); // No Content
    exit();
}

// 3. Conexão com o Banco de Dados
$pdo = get_db_connection();

// 4. Roteamento Simples
$method = $_SERVER['REQUEST_METHOD'];

// *******************************************************************
// LÓGICA: EXTRAIR A ROTA MANUALMENTE DO REQUEST_URI
// *******************************************************************

// Obtém o caminho base do script (ex: /api-ecommerce/api/index.php)
$script_path = $_SERVER['SCRIPT_NAME']; 
// Obtém o diretório base (ex: /api-ecommerce/api/)
$base_dir = dirname($script_path) . '/';

// Obtém a URI completa solicitada pelo usuário (ex: /api-ecommerce/api/auth/register?foo=bar)
$request_uri = $_SERVER['REQUEST_URI'];

// 1. Remove a Query String (tudo após o '?')
$request_uri = strtok($request_uri, '?');

// 2. Remove o diretório base da URI para obter apenas a rota
if (strpos($request_uri, $base_dir) === 0) {
    $route = substr($request_uri, strlen($base_dir));
} else {
    // Se não conseguir remover, usa a URI completa como fallback
    $route = $request_uri;
}
$route = trim($route, '/'); // Finaliza removendo barras extras (ex: 'auth/register')

// *******************************************************************

if ($route === 'auth/register' && $method === 'POST') {
    require_once 'auth.php';
    register_user($pdo);

} elseif ($route === 'auth/login' && $method === 'POST') {
    require_once 'auth.php';
    login_user($pdo);

} elseif ($route === 'categories' && $method === 'GET') {
    require_once 'products.php';
    get_all_categories($pdo);

} elseif ($route === 'products' && $method === 'GET') {
    require_once 'products.php';
    get_products($pdo);

} elseif ($route === 'sales/order' && $method === 'POST') {
    require_once 'sales.php';
    create_order($pdo); 

}  elseif ($route === 'history/orders' && $method === 'GET') {
    require_once 'products.php';
    get_user_order_history($pdo);

} elseif ($route === 'cart') {
    require_once 'cart.php';
} else {
    send_json_response(['error' => 'Rota não encontrada ou método não permitido.'], 404);
}