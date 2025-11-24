import { API_BASE_URL } from './main.js';

async function fetchProducts(categoryId = null) {
    let url = `${API_BASE_URL}/products`;
    if (categoryId) {
        url += `?category_id=${categoryId}`;
    }

    try {
        console.log("Buscando produtos em:", url);
        const response = await fetch(url);
        if (!response.ok) {
            console.error("Erro ao buscar produtos:", response.statusText);
            return [];
        }
        const products = await response.json();
        return products;
    } catch (error) {
        console.error("Falha na comunicação com a API de produtos:", error);
        return [];
    }
}

function renderProducts(products) {
    const productListContainer = document.getElementById('product-cards');
    if (!productListContainer) {
        console.warn("Elemento para lista de produtos ('product-cards') não encontrado.");
        return;
    }

    productListContainer.innerHTML = '';

    if (products.length === 0) {
        productListContainer.innerHTML = '<p class="text-center w-full loading-text">Nenhum produto encontrado nesta categoria.</p>';
        return;
    }

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('products-wrapper');

        const formattedPrice = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(product.preco);

        productCard.innerHTML = `
            <div class="product-card" data-id="${product.id_produto}" data-name="${product.nome_produto}">
                <h3>${product.nome_produto}</h3>
                <div class="product-image-container">
                    <img src="${product.imagem || 'https://placehold.co/400x300/F0F0F0/333333?text=IMAGEM+PADRAO'}" 
                         alt="${product.nome_produto}" 
                         onerror="this.onerror=null;this.src='https://placehold.co/400x300/F0F0F0/333333?text=SEM+IMAGEM';">
                </div>
                <p class="description">${product.descricao ? product.descricao.substring(0, 50) + '...' : 'Descrição não disponível.'}</p>
                <p class="category">${product.nome_categoria || 'Geral'}</p>
                <p class="price">${formattedPrice}</p>
                <button class="btn btn-add-to-cart" data-product-id="${product.id_produto}">
                    <i class="fas fa-cart-plus"></i> Adicionar
                </button>
            </div>
        `;

        productListContainer.appendChild(productCard);

        // Evento de adicionar ao carrinho
        const addButton = productCard.querySelector('.btn-add-to-cart');
        if (addButton) {
        addButton.addEventListener('click', async (e) => {
            const token = localStorage.getItem('token');  // Verifica se o token existe
            if (!token) {
                alert('Você precisa estar logado para adicionar ao carrinho.');
                window.location.href = '../html/login.html';  // Redireciona para login
                return;
            }

                const itemToSend = {
                    id_produto: product.id_produto,
                    quantidade: 1  // Quantidade padrão
                };

                try {
                    const response = await fetch(`${API_BASE_URL}/cart`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify(itemToSend)
                    });

                    if (response.ok) {
                        const data = await response.json();
                        alert(data.success || 'Produto adicionado ao carrinho!');
                        
                        // Atualiza o contador do carrinho no header
                        import('./CartRender.js').then(module => {
                            module.updateCartCount();
                        });
                    } else {
                        const error = await response.json();
                        alert(`Erro: ${error.error || 'Falha ao adicionar.'}`);
                    }
                } catch (error) {
                    console.error('Erro ao conectar à API:', error);
                    alert('Erro de conexão. Tente novamente.');
                }

                // Feedback visual
                e.currentTarget.textContent = 'Adicionado!';
                setTimeout(() => {
                    e.currentTarget.innerHTML = '<i class="fas fa-cart-plus"></i> Adicionar';
                }, 800);
            });
        }
    });
}

export async function loadProducts(categoryId = null) {
    const productListContainer = document.getElementById('product-cards');
    if (productListContainer) {
        productListContainer.innerHTML = '<p class="text-center w-full loading-text">Carregando produtos...</p>';
    }
    
    const products = await fetchProducts(categoryId);
    renderProducts(products);
}