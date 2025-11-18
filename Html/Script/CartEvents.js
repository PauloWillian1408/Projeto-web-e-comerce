// Event listeners globais CartEvents.js

import { addToCart, removeItemFromCart, updateQuantity } from "./CartActions.js";

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
}