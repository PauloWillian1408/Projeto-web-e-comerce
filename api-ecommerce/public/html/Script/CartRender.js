import { API_BASE_URL, getAuthToken } from './main.js';

export async function updateCartCount() {
    const token = getAuthToken();
    if (!token) {
        const cartCountSpan = document.getElementById('cart-count');
        if (cartCountSpan) cartCountSpan.textContent = '0';
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/cart`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
            const cart = await response.json();
            const totalItems = cart.reduce((sum, item) => sum + item.quantidade, 0);
            const cartCountSpan = document.getElementById('cart-count');
            if (cartCountSpan) cartCountSpan.textContent = totalItems;
        } else {
            console.error('Erro ao buscar contador do carrinho');
        }
    } catch (error) {
        console.error('Erro de conexão no contador:', error);
    }
}

export async function renderCart() {
    const token = getAuthToken();
    if (!token) {
        alert('Você precisa estar logado para ver o carrinho.');
        window.location.href = 'login.html';
        return;
    }

    const container = document.getElementById("cart-items-container");
    const subtotalElement = document.getElementById("cart-subtotal");
    const totalElement = document.getElementById("cart-total");
    const emptyMessage = document.getElementById("empty-cart-message");
    const btnCheckout = document.getElementById("btn-checkout");

    if (!container) return;

    try {
        const response = await fetch(`${API_BASE_URL}/cart`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!response.ok) {
            alert('Erro ao carregar carrinho.');
            return;
        }

        const cart = await response.json();
        container.innerHTML = "";
        let totalGeral = 0;

        if (cart.length === 0) {
            emptyMessage.style.display = "block";
            subtotalElement.textContent = "R$ 0,00";
            totalElement.textContent = "R$ 0,00";
            btnCheckout.disabled = true;
            updateCartCount();
            return;
        }

        emptyMessage.style.display = "none";
        btnCheckout.disabled = false;

        cart.forEach(item => {
            const price = parseFloat(item.preco);
            const quantity = parseInt(item.quantidade);
            const subtotalItem = price * quantity;
            totalGeral += subtotalItem;

            container.innerHTML += `
                <div class="cart-item">
                    <div class="item-details">
                        <img src="${item.imagem || 'https://placehold.co/400x300/F0F0F0/333333?text=SEM+IMAGEM'}" class="item-img" alt="${item.nome_produto}">
                        <div class="item-info">
                            <span>${item.nome_produto}</span>
                            <p>Preço unitário: R$ ${price.toFixed(2)}</p>
                            <div class="item-quantity-control">
                                <button class="qty-btn btn-decrease" data-product-id="${item.id_produto}">−</button>
                                <span class="quantity-number">${quantity}</span>
                                <button class="qty-btn btn-increase" data-product-id="${item.id_produto}">+</button>
                            </div>
                        </div>
                    </div>
                    <div class="item-price">
                        <strong>R$ ${subtotalItem.toFixed(2)}</strong>
                    </div>
                    <button class="remove-item-btn" data-product-id="${item.id_produto}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
                <hr>
            `;
        });

        subtotalElement.textContent = `R$ ${totalGeral.toFixed(2)}`;
        totalElement.textContent = `R$ ${totalGeral.toFixed(2)}`;

        initCartEvents();  // Liga os eventos aos botões
    } catch (error) {
        console.error('Erro ao renderizar carrinho:', error);
        alert('Erro de conexão.');
    }
}

// Função para inicializar eventos dos botões do carrinho
function initCartEvents() {
    const token = getAuthToken();
    if (!token) return;

    // Evento para aumentar quantidade (+)
    document.querySelectorAll('.btn-increase').forEach(button => {
        button.addEventListener('click', async (e) => {
            const id_produto = e.target.dataset.productId;
            const currentQtyElement = e.target.previousElementSibling;  // <span class="quantity-number">
            const currentQty = parseInt(currentQtyElement.textContent);
            const newQty = currentQty + 1;

            try {
                const response = await fetch(`${API_BASE_URL}/cart`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ id_produto: id_produto, quantidade: newQty })
                });

                if (response.ok) {
                    renderCart();  // Recarrega o carrinho para refletir mudanças
                } else {
                    const error = await response.json();
                    alert(`Erro: ${error.error || 'Falha ao atualizar.'}`);
                }
            } catch (error) {
                console.error('Erro ao aumentar quantidade:', error);
                alert('Erro de conexão.');
            }
        });
    });

    // Evento para diminuir quantidade (-)
    document.querySelectorAll('.btn-decrease').forEach(button => {
        button.addEventListener('click', async (e) => {
            const id_produto = e.target.dataset.productId;
            const currentQtyElement = e.target.nextElementSibling;  // <span class="quantity-number">
            const currentQty = parseInt(currentQtyElement.textContent);
            const newQty = currentQty - 1;

            if (newQty < 0) return;  // Não permite quantidade negativa

            try {
                const response = await fetch(`${API_BASE_URL}/cart`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ id_produto: id_produto, quantidade: newQty })
                });

                if (response.ok) {
                    renderCart();  // Recarrega o carrinho
                } else {
                    const error = await response.json();
                    alert(`Erro: ${error.error || 'Falha ao atualizar.'}`);
                }
            } catch (error) {
                console.error('Erro ao diminuir quantidade:', error);
                alert('Erro de conexão.');
            }
        });
    });

    // Evento para remover item (lixeira)
    document.querySelectorAll('.remove-item-btn').forEach(button => {
        button.addEventListener('click', async (e) => {
            const id_produto = e.target.closest('button').dataset.productId;  // Para o ícone dentro do botão

            if (!confirm('Tem certeza que deseja remover este item do carrinho?')) return;

            try {
                const response = await fetch(`${API_BASE_URL}/cart`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ id_produto: id_produto })
                });

                if (response.ok) {
                    renderCart();  // Recarrega o carrinho
                } else {
                    const error = await response.json();
                    alert(`Erro: ${error.error || 'Falha ao remover.'}`);
                }
            } catch (error) {
                console.error('Erro ao remover item:', error);
                alert('Erro de conexão.');
            }
        });
    });
}