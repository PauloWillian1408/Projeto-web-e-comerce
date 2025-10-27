document.addEventListener("DOMContentLoaded", function () {

    // FUNÇÕES BÁSICAS DO CARRINHO (Usadas em todas as páginas)

    // Função para obter o carrinho do localStorage ou retornar um array vazio
    function getCart() {
        const cartJson = localStorage.getItem("shoppingCart");
        return cartJson ? JSON.parse(cartJson) : [];
    }

    // Função para salvar o carrinho no localStorage
    function saveCart(cart) {
        localStorage.setItem("shoppingCart", JSON.stringify(cart));
        // Atualiza o contador de itens no cabeçalho
        updateCartCount(cart.length);
    }

    // Função para atualizar o número de itens no cabeçalho
    function updateCartCount(count) {
        const cartCountElement = document.getElementById("cart-count");
        if (cartCountElement) {
            cartCountElement.textContent = count;
        }
    }

    // Função para adicionar um produto ao carrinho (chamada pelos botões)
    function addToCart(product) {
        const cart = getCart();

        // Verifica se o produto já existe no carrinho
        const existingProduct = cart.find((item) => item.id === product.id);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            product.quantity = 1;
            cart.push(product);
        }

        saveCart(cart);
        alert(
            `"${product.name}" adicionado ao carrinho! Total de itens: ${cart.length}`
        );
        
        // Se estiver na página do carrinho, renderiza novamente após adicionar
        if (document.getElementById("shopping-cart")) {
            renderCart();
        }
    }

    // --------------------------------------------------------------------
    // LÓGICA DE EXIBIÇÃO DO CARRINHO (Apenas para carrinho.html)
    // --------------------------------------------------------------------

    // NOVO: Função para renderizar (mostrar) os itens na página do carrinho
    function renderCart() {
        const cart = getCart(); 
        
        // Elementos HTML essenciais (IDs do seu carrinho.html)
        const container = document.getElementById("cart-items-container");
        const subtotalElement = document.getElementById("cart-subtotal");
        const totalElement = document.getElementById("cart-total");
        const emptyMessage = document.getElementById("empty-cart-message");
        const btnCheckout = document.getElementById("btn-checkout");

        if (!container) return; // Garante que só roda na página do carrinho

        // Zera o conteúdo e os totais
        container.innerHTML = "";
        let totalGeral = 0;
        
        // -------------------------------------------------------------------
        
        if (cart.length === 0) {
            // Mostra a mensagem de carrinho vazio e desativa o botão de finalizar
            emptyMessage.style.display = 'block';
            subtotalElement.textContent = 'R$ 0,00';
            totalElement.textContent = 'R$ 0,00';
            btnCheckout.disabled = true;
            return;
        }

        // Oculta a mensagem de vazio
        emptyMessage.style.display = 'none';
        btnCheckout.disabled = false;


        // 2. Itera sobre os itens do carrinho e cria o HTML
        cart.forEach(item => {
            const subtotalItem = item.price * item.quantity;
            totalGeral += subtotalItem;

            // OBSERVAÇÃO: Ajuste a classe 'cart-item-detail' se necessário
            const itemHtml = `
                <div class="cart-item-detail">
                    <img src="${item.image || 'placeholder.jpg'}" alt="${item.name}" class="item-img">
                    <div class="item-info">
                        <h4>${item.name}</h4>
                        <p>Preço unitário: R$ ${item.price.toFixed(2).replace('.', ',')}</p>
                        <p>Quantidade: ${item.quantity}</p>
                    </div>
                    <div class="item-subtotal">
                        <p>Subtotal: <strong>R$ ${subtotalItem.toFixed(2).replace('.', ',')}</strong></p>
                    </div>
                </div>
                <hr>
            `;
            container.innerHTML += itemHtml;
        });

        // 3. Atualiza o resumo de totais
        const totalFormatado = totalGeral.toFixed(2).replace('.', ',');
        subtotalElement.textContent = `R$ ${totalFormatado}`;
        totalElement.textContent = `R$ ${totalFormatado}`;
    }

    // INICIALIZAÇÃO DO SITE

    // Ouve cliques nos botões "Adicionar ao Carrinho"
    const addToCartButtons = document.querySelectorAll(".btn-add-to-cart");

    addToCartButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const card = this.closest(".product-card");

            const productId = card.getAttribute("data-id");
            const productName = card.getAttribute("data-name");
            const productPriceText = card.querySelector(".product-price").textContent;
            
            // Tentativa de pegar a URL da imagem (opcional, dependendo do seu HTML)
            const productImage = card.getAttribute("data-image");

            // Limpa o texto do preço
            const price = parseFloat(
                productPriceText.replace("R$", "").replace(",", ".").trim()
            );

            if (productId && productName && price) {
                const product = {
                    id: productId,
                    name: productName,
                    price: price,
                    image: productImage // Adiciona a imagem ao objeto
                };
                addToCart(product);
            } else {
                console.error(
                    "Dados do produto faltando para adicionar ao carrinho.",
                    card
                );
                alert(
                    "Erro: Não foi possível adicionar o produto ao carrinho. Dados ausentes."
                );
            }
        });
    });
    
    // Chama a função de renderizar se for a página do carrinho
    if (document.getElementById("shopping-cart")) {
        renderCart();
    }
    
    // Inicia a contagem do carrinho ao carregar a página
    updateCartCount(getCart().length);

    // LÓGICA DA GALERIA (Mantida inalterada)


    function setupProductGallery(gallery) {
        const images = gallery.querySelectorAll(".product-image");
        const prevBtn = gallery.querySelector(".prev-btn");
        const nextBtn = gallery.querySelector(".next-btn");
        let currentImageIndex = 0;

        function updateGallery() {
            images.forEach((img, index) => {
                img.classList.remove("active");
                if (index === currentImageIndex) {
                    img.classList.add("active");
                }
            });
        }

        if (images.length > 1) {
            if (prevBtn)
                prevBtn.addEventListener("click", () => {
                    currentImageIndex =
                        (currentImageIndex - 1 + images.length) % images.length;
                    updateGallery();
                });

            if (nextBtn)
                nextBtn.addEventListener("click", () => {
                    currentImageIndex = (currentImageIndex + 1) % images.length;
                    updateGallery();
                });
        } else {
            if (prevBtn) prevBtn.style.display = "none";
            if (nextBtn) nextBtn.style.display = "none";
        }
    }

    const productCards = document.querySelectorAll(".product-card");

    productCards.forEach((card) => {
        const gallery = card.querySelector(".gallery");
        if (gallery) {
            setupProductGallery(gallery);
        }
    });

    window.getCart = getCart;
});