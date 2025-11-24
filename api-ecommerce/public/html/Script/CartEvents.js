// Event listeners globais CartEvents.js

import { addToCart, removeItemFromCart, updateQuantity } from "./CartActions.js";

function attachCartControlListeners() {
    const cartContainer = document.getElementById("cart-items-container");

    if (!cartContainer) return;

    // Usamos delegação de eventos no container pai para eficiência
    cartContainer.addEventListener("click", (event) => {
        const target = event.target;
        
        // --- 1. BOTÃO REMOVER ITEM (Lixeira) ---
        // event.target.closest encontra o elemento pai mais próximo com a classe/seletor
        const removeBtn = target.closest(".remove-item-btn");
        if (removeBtn) {
            const id = removeBtn.dataset.productId;
            // Ação: Remove o item do carrinho (não usamos confirm() por restrições do ambiente)
            removeItemFromCart(id);
            return;
        }

        // --- 2. BOTÃO AUMENTAR QUANTIDADE (+) ---
        const btnIncrease = target.closest(".btn-increase");
        if (btnIncrease) {
            const id = btnIncrease.dataset.productId;
            // Ação: Aumenta a quantidade em +1
            updateQuantity(id, +1);
            return;
        }

        // --- 3. BOTÃO DIMINUIR QUANTIDADE (-) ---
        const btnDecrease = target.closest(".btn-decrease");
        if (btnDecrease) {
            const id = btnDecrease.dataset.productId;
            // Ação: Diminui a quantidade em -1 (a lógica em CartActions.js remove se for <= 0)
            updateQuantity(id, -1);
            return;
        }
    });
}

function attachCheckoutListener() {
    const btnCheckout = document.getElementById("btn-checkout");
    
    if (btnCheckout) {
        // Vincula a função que verifica o token e envia a venda para a API
        btnCheckout.addEventListener('click', processCheckout);
        console.log("Evento de Checkout anexado ao botão.");
    }
}

export function initCartEvents() {

    document.addEventListener("click", (event) => {

        const removeBtn = event.target.closest(".remove-item-btn");
        if (removeBtn) {
            const id = removeBtn.dataset.productId;
            if (confirm("Deseja remover este produto?")) {
                removeItemFromCart(id);
            }
            return;
        }

        const btnIncrease = event.target.closest(".btn-increase");
        if (btnIncrease) {
            updateQuantity(btnIncrease.dataset.productId, +1);
            return;
        }

        const btnDecrease = event.target.closest(".btn-decrease");
        if (btnDecrease) {
            updateQuantity(btnDecrease.dataset.productId, -1);
            return;
        }

        const addBtn = event.target.closest(".btn-add-to-cart");
        if (addBtn) {

            const card = addBtn.closest(".product-card");

            const product = {
                id: String(card.dataset.id),
                name: card.dataset.name,
                price: parseFloat(
                    card.querySelector(".product-price").textContent.replace("R$", "").trim()
                ),
                image: card.dataset.image
            };

            addToCart(product);
        }
    });

     // 1. Vincula os listeners de controle (botões de + / - / remover)
    attachCartControlListeners();
    
    // 2. Vincula o listener do botão Finalizar Compra
    attachCheckoutListener();
}