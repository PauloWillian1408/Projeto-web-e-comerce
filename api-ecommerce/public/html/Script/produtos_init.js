import { API_BASE_URL } from './main.js'; 

import { loadProducts } from './produtoCard.js';

import { updateCartCount } from './CartRender.js'; 

async function fetchCategoryName(categoryId) {
    if (!categoryId || categoryId === 'all') {
        return "Todos os Produtos";
    }

    try {
        // Busca todas as categorias para encontrar o nome (poderia ser otimizado no backend)
        const url = `${API_BASE_URL}/categories`; 
        const response = await fetch(url);

        if (!response.ok) {
            console.error(`Erro ${response.status} ao buscar categorias.`);
            return `Categoria ID: ${categoryId}`;
        }

        const categories = await response.json();
        
        // Filtra no frontend para encontrar o nome correspondente ao ID
        const foundCategory = categories.find(cat => String(cat.id_categoria) === String(categoryId));

        return foundCategory ? foundCategory.nome_categoria : `Categoria ID: ${categoryId} (Não encontrada)`;

    } catch (error) {
        console.error("Falha na comunicação com a API para buscar nome da categoria:", error);
        return `Categoria ID: ${categoryId}`;
    }
}

async function initProductPage() {
    const urlParams = new URLSearchParams(window.location.search);
    
    const categoryId = urlParams.get('category_id');
    
    const pageTitleElement = document.getElementById('page-title');

    const categoryName = await fetchCategoryName(categoryId);

    const siteBaseTitle = " | M.W Calçados";

    if (pageTitleElement) {
        pageTitleElement.textContent = categoryName;
    }

    document.title = categoryName + siteBaseTitle;

    loadProducts(categoryId);
    
    updateCartCount();
}

document.addEventListener('DOMContentLoaded', initProductPage);