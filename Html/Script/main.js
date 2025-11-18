// Inicialização geral 

import { updateCartCount } from "./CartRender.js";
import { renderCart } from "./CartRender.js";
import { initCartEvents } from "./CartEvents.js";

document.addEventListener("DOMContentLoaded", () => {
    initCartEvents();
    updateCartCount();

    if (document.getElementById("shopping-cart")) {
        renderCart();
    }
});
