document.addEventListener("DOMContentLoaded", function () {
  // --------------------------------------------------------------------
  // LÓGICA DO CARRINHO DE COMPRAS
  // --------------------------------------------------------------------

  // Função para obter o carrinho do localStorage ou retornar um array vazio
  function getCart() {
    const cartJson = localStorage.getItem("shoppingCart");
    // O JSON.parse converte a string JSON de volta para um objeto/array JavaScript
    return cartJson ? JSON.parse(cartJson) : [];
  }

  // Função para salvar o carrinho no localStorage
  function saveCart(cart) {
    // O JSON.stringify converte o objeto/array JavaScript para uma string JSON
    localStorage.setItem("shoppingCart", JSON.stringify(cart));
    // Opcional: Atualizar o contador de itens no cabeçalho
    updateCartCount(cart.length);
  }

  // Função para atualizar o número de itens no cabeçalho (requer um elemento HTML com o ID 'cart-count')
  function updateCartCount(count) {
    const cartCountElement = document.getElementById("cart-count");
    if (cartCountElement) {
      cartCountElement.textContent = count;
    }
  }

  // Função para adicionar um produto ao carrinho
  function addToCart(product) {
    const cart = getCart();

    // Verifica se o produto já existe no carrinho
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      // Se existir, apenas aumenta a quantidade
      existingProduct.quantity += 1;
    } else {
      // Se não existir, adiciona o novo produto com quantidade 1
      product.quantity = 1;
      cart.push(product);
    }

    saveCart(cart);
    alert(
      `"${product.name}" adicionado ao carrinho! Total de itens: ${cart.length}`
    );
  }

  // Ouve cliques nos botões "Adicionar ao Carrinho"
  const addToCartButtons = document.querySelectorAll(".btn-add-to-cart");

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Este é o desafio do front-end: pegar os dados do produto a partir do HTML
      const card = this.closest(".product-card");

      // É crucial que você adicione esses atributos (data-id e data-name) nos seus cards HTML!
      const productId = card.getAttribute("data-id");
      const productName = card.getAttribute("data-name");
      const productPriceText = card.querySelector(".product-price").textContent;

      // Limpa o texto do preço (ex: "R$ 170,00" -> 170.00)
      const price = parseFloat(
        productPriceText.replace("R$", "").replace(",", ".").trim()
      );

      // Se os dados essenciais estiverem presentes, adicione ao carrinho
      if (productId && productName && price) {
        const product = {
          id: productId,
          name: productName,
          price: price,
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

  // Inicia a contagem do carrinho ao carregar a página
  updateCartCount(getCart().length);

  // --------------------------------------------------------------------
  // LÓGICA DA GALERIA
  // --------------------------------------------------------------------

  // Função original da galeria
  function setupProductGallery(gallery) {
    // ... (código da função setupProductGallery que você enviou) ...
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
      // Oculta os botões se houver apenas uma imagem
      if (prevBtn) prevBtn.style.display = "none";
      if (nextBtn) nextBtn.style.display = "none";
    }
  }

  // Aplica a lógica da galeria a todos os cards
  const productCards = document.querySelectorAll(".product-card");

  productCards.forEach((card) => {
    const gallery = card.querySelector(".gallery");
    if (gallery) {
      setupProductGallery(gallery);
    }
  });

  // Esta função será crucial para o futuro PHP: expor a função de obtenção do carrinho
  window.getCart = getCart;
});
