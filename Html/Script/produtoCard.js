
async function produtoCard() {

    const api = "../Html/json/produtoCard.json" 

    const listaProdutos = document.getElementById("product-cards")

    listaProdutos.innerHTML = '<div class="products-wrapper">Carregando catalogo...</div>'

    fetch(api).then(response => {
        if(!response.ok) {
            throw new Error("Erro ao carregar dados " + response.status)
        }

        return response.json()
    }).then(data => {   
        const produtos = data.produtos

        listaProdutos.innerHTML = ''

        produtos.forEach(produto => {

            const precoFormato = `R$ ${produto.preco.toFixed(2).replace('.', ',')}`

            const cardProduto = `
                <div
                    class="product-card"
                    data-id="${produto.id}"
                    data-name="${produto.nome}" 
                    data-image="${produto.imagem}" 
                >
                    <div class="product-image-container">
                        <img
                            src="${produto.imagem}"
                            alt="${produto.nome}"
                            class="grid-image"
                        />
                    </div>
                    <p class="product-price">${precoFormato}</p>
                    <button class="btn-add-to-cart">
                        <i class="fas fa-cart-plus"></i> Adicionar ao Carrinho
                    </button>
                </div>
            `

            listaProdutos.insertAdjacentHTML('beforeend', cardProduto)
        });

        console.log("Dados carregados com sucesso:", data)
    }).catch(error => {
        console.log("Houve um problema:", error)
    });
}

produtoCard()