import { API_BASE_URL, getAuthToken } from './main.js';
import { getCart, saveCart } from "./CartStorage.js";
import { renderCart, updateCartCount } from "./CartRender.js";

async function updateCartApi(productId, quantity) {
    const token = getAuthToken();
    if (!token) {
        alert("Você precisa estar logado para gerenciar o carrinho.");
        window.location.href = '../html/login.html';
        return false;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/sales/order`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ id_produto: productId, quantidade: quantity })
        });

        const data = await response.json();

        if (response.ok) {
            // Atualiza a visualização do carrinho e o contador após o sucesso da API
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

export function removeItemFromCart(productId) {
    let cart = getCart();

    const newCart = cart.filter(item => String(item.id) !== String(productId));

    saveCart(newCart);
    updateCartCount();
    renderCart();
}

export function addToCart(product, quantity = 1) {
    const cart = getCart();

    const productId = String(product.id_produto).trim();

    const existingProduct = cart.find(item => String(item.id_produto) === productId);

    if (existingProduct) {
        existingProduct.quantidade = (existingProduct.quantidade || 0) + quantity;
    } else {
        const newItem = {
            id_produto: productId,
            nome_produto: product.nome_produto,
            preco: parseFloat(product.preco),
            quantidade: quantity
        };
        cart.push(newItem);
    }

    updateCartApi(cart);
    updateCartCount();

    alert(`"${product.nome_produto}" adicionado ao carrinho!`);

    if (document.getElementById("shopping-cart")) {
        renderCart();
    }

    console.log(`Produto ${product.nome_produto} (${quantity} unidades) adicionado ao carrinho.`);
}

export function updateQuantity(productId, change) {
    const cart = getCart();

    const item = cart.find(p => String(p.id) === String(productId));
    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
        if (confirm("Remover produto do carrinho?")) {
            cart.splice(cart.indexOf(item), 1);
        } else {
            return;
        }
    }

    updateCartApi(cart);
    updateCartCount();
    renderCart();
}


