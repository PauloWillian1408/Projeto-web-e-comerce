import { API_BASE_URL, getAuthToken } from './main.js';
import { updateCartCount, renderCart } from './CartRender.js';

export async function getCart() {
    const token = getAuthToken();
    
    // Se não estiver logado, não há carrinho para buscar no DB.
    if (!token) {
        // Retorna um array vazio rapidamente para renderização do carrinho vazio
        return []; 
    }

    try {
        const url = `${API_BASE_URL}/history/orders`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            return await response.json();
        } else {
            console.error(`Erro ao buscar carrinho no DB: ${response.status} ${response.statusText}`);
            // Se for erro 401 (não autorizado), a API tratará isso. Retornamos vazio.
            return [];
        }

    } catch (error) {
        console.error('Falha de rede ao buscar carrinho:', error);
        return [];
    }
}

export async function saveCart(productId, quantity) {
    const token = getAuthToken();

    if (!token) {
        alert("Você precisa fazer login para gerenciar o carrinho persistente.");
        window.location.href = 'Login.html'; // Corrigido para ir para a página de login
        return false;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/history/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ id_produto: productId, quantidade: quantity })
        });

        const data = await response.json();

        if (response.ok) {
            // Após o sucesso da API, atualiza a visualização no frontend
            renderCart(); 
            updateCartCount();
            return true;
        } else {
            alert(`Erro ao atualizar carrinho: ${data.error || 'Falha na comunicação com a API.'}`);
            console.error("Erro API Carrinho:", data);
            return false;
        }
    } catch (error) {
        console.error('Erro de rede ao atualizar carrinho:', error);
        alert('Falha de rede ao conectar com o servidor.');
        return false;
    }
}

// const CART_STORAGE_KEY = 'ecommCartItems';

// export function getCart() {
//     // const cartJson = localStorage.getItem("shoppingCart");
//     // return cartJson ? JSON.parse(cartJson) : [];

//     try {
//         const items = localStorage.getItem(CART_STORAGE_KEY);
//         // Retorna o array de itens ou um array vazio se não houver nada ou o JSON for inválido
//         return items ? JSON.parse(items) : [];
//     } catch (e) {
//         console.error("Erro ao ler o carrinho do localStorage:", e);
//         localStorage.removeItem(CART_STORAGE_KEY);
//         return []; // Retorna vazio em caso de erro para não quebrar a aplicação
//     }
// }

// export function saveCart(items) {
//     // localStorage.setItem("shoppingCart", JSON.stringify(cart));
//     try {
//         localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
//         console.log(`Carrinho salvo com ${items.length} itens.`);
//     } catch (e) {
//         console.error("Erro ao salvar o carrinho no localStorage:", e);
//     }

//     updateCartCount();

//     if (document.getElementById('cart-items-container')) {
//         renderCart();
//     }
// }
