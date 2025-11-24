// Script/carrinho_init.js - Script de inicialização da página Carrinho.html

// Importa as funções essenciais para visualização e interação
import { renderCart } from './CartRender.js'; 
import { initCartEvents } from './CartEvents.js';

/**
 * Função que inicia o carregamento da página do carrinho.
 * Ela é responsável por:
 * 1. Exibir os itens do carrinho.
 * 2. Anexar os listeners para os botões de controle (+, -, remover, checkout).
 */
function initCarrinhoPage() {
    renderCart();

    initCartEvents(); 
    
    console.log("Página do Carrinho inicializada e eventos anexados.");
}

// Inicializa a página após o DOM estar totalmente carregado
document.addEventListener('DOMContentLoaded', initCarrinhoPage);