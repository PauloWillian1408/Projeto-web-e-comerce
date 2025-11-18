// Renderização do carrinho - CartRender.js

import { getCart } from "./CartStorage.js";
import { updateQuantity } from "./CartActions.js";

export function updateCartCount() {
    const cart = getCart();
    const cartCountElement = document.getElementById("cart-count");
    if (cartCountElement) cartCountElement.textContent = cart.length;
}

export function renderCart() {
    const cart = getCart();

    const container = document.getElementById("cart-items-container");
    const subtotalElement = document.getElementById("cart-subtotal");
    const totalElement = document.getElementById("cart-total");
    const emptyMessage = document.getElementById("empty-cart-message");
    const btnCheckout = document.getElementById("btn-checkout");

    if (!container) return;

    container.innerHTML = "";
    let totalGeral = 0;

    if (cart.length === 0) {
        emptyMessage.style.display = "block";
        subtotalElement.textContent = "R$ 0,00";
        totalElement.textContent = "R$ 0,00";
        btnCheckout.disabled = true;
        return;
    }

    emptyMessage.style.display = "none";
    btnCheckout.disabled = false;

    cart.forEach(item => {
        const price = parseFloat(item.price);
        const quantity = parseInt(item.quantity);
        const subtotalItem = price * quantity;
        totalGeral += subtotalItem;

        container.innerHTML += `
            <div class="cart-item">
                <div class="item-details">
                    <img src="${item.image}" class="item-img">
                    <div class="item-info">
                        <span>${item.name}</span>
                        <p>Preço unitário: R$ ${price.toFixed(2)}</p>

                        <div class="item-quantity-control">
                            <button class="qty-btn btn-decrease" data-product-id="${item.id}">−</button>
                            <span class="quantity-number">${quantity}</span>
                            <button class="qty-btn btn-increase" data-product-id="${item.id}">+</button>
                        </div>
                    </div>
                </div>

                <div class="item-price">
                    <strong>R$ ${subtotalItem.toFixed(2)}</strong>
                </div>

                <button class="remove-item-btn" data-product-id="${item.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
            <hr>
        `;
    });

    subtotalElement.textContent = `R$ ${totalGeral.toFixed(2)}`;
    totalElement.textContent = `R$ ${totalGeral.toFixed(2)}`;
}
