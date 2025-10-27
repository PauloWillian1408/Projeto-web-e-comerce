
async function ApiAjax() {
    const api = "json/categorias.json"

    const listaContainer = document.getElementById("lista-catalogo")

    listaContainer.innerHTML = '<a class="category-link">Carregando catalogo...</a>'

    fetch(api).then(response => {
        if(!response.ok) {
            throw new Error("Erro ao carregar dados " + response.status)
        }

        return response.json()
    }).then(data => {
        const categorias = data.catalogo

        listaContainer.innerHTML = ''

        categorias.forEach(item => {
            const a = document.createElement('a')

            a.classList.add('category-link')

            a.href = `../Plataformas Html/${item.link}`

            a.textContent = `${item.categoria}`

            listaContainer.appendChild(a)
        });

        console.log("Dados carregados com sucesso:", data)

        console.log("Dado do catalogo: ", data.catalogo[1].categoria)
    }).catch(error => {
        console.log("Houve um problema:", error)
    });
}

ApiAjax()