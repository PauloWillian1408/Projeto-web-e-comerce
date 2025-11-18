// Funções do local storage (get/save) CarStorage.js

export function getCart() {
    const cartJson = localStorage.getItem("shoppingCart");
    return cartJson ? JSON.parse(cartJson) : [];
}

export function saveCart(cart) {
    localStorage.setItem("shoppingCart", JSON.stringify(cart));
}
