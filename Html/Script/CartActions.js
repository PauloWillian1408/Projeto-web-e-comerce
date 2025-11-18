// Adicionar / remover itens CartActions.js

import { getCart, saveCart } from "./CartStorage.js";
import { renderCart } from "./CartRender.js";
import { updateCartCount } from "./CartRender.js";

export function removeItemFromCart(productId) {
    let cart = getCart();

    const newCart = cart.filter(item => String(item.id) !== String(productId));

    saveCart(newCart);
    updateCartCount();
    renderCart();
}

export function addToCart(product) {
    const cart = getCart();

    const existingProduct = cart.find(item => String(item.id) === String(product.id));

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        product.quantity = 1;
        cart.push(product);
    }

    saveCart(cart);
    updateCartCount();

    alert(`"${product.name}" adicionado ao carrinho!`);

    if (document.getElementById("shopping-cart")) {
        renderCart();
    }
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

    saveCart(cart);
    updateCartCount();
    renderCart();
}


