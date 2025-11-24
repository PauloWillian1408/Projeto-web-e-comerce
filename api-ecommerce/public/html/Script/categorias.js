import { 
    API_BASE_URL
} from './main.js';

const listaCatalogo = document.getElementById("lista-catalogo")

async function fetchCategories() {
    try {
        console.log("Buscando categorias em:", `${API_BASE_URL}/categories`);
        const response = await fetch(`${API_BASE_URL}/categories`);
        
        if (!response.ok) {
            console.error("Erro ao buscar categorias:", response.statusText);
            return [];
        }

        const categories = await response.json();
        return categories;

    } catch (error) {
        console.error("Falha na comunicação com a API de categorias:", error);

        return [];
    }
}

function renderCategories(categories) {
    if (!listaCatalogo) {
        console.warn("Elemento para navegação de categorias ('lista-catalogo') não encontrado.");
        return;
    }

    listaCatalogo.innerHTML = ''; 

    const createCategoryLinkElement = (id, name, isActive = false) => {
        const a = document.createElement('a');
        
        a.classList.add('category-link');
        a.href = '#';
        a.textContent = name;
        
        // Armazena o ID da categoria no data-set (data-id) para ser lido no evento de clique
        a.dataset.id = id; 
        
        if (isActive) {
            a.classList.add('active');
        }

        listaCatalogo.appendChild(a);
    };

    categories.forEach(category => {
        createCategoryLinkElement(category.id_categoria, category.nome_categoria);
    });

    attachCategoryEventListeners();
}

function attachCategoryEventListeners() {
    // Busca todos os links criados
    const categoryLinks = document.querySelectorAll('.category-link');
    
    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Lógica visual de ativação (opcional)
            categoryLinks.forEach(l => l.classList.remove('active'));
            e.target.classList.add('active'); 

            // Lê o ID armazenado no data-id
            const categoryId = e.target.dataset.id;
            
            // Página de destino
            let targetUrl = '../paginas/produtos.html'; 

            if (categoryId && categoryId !== 'all') {
                // Adiciona o ID como parâmetro de query
                targetUrl += `?category_id=${categoryId}`;
            }

            // Executa o redirecionamento
            window.location.href = targetUrl;
        });
    });
}

export async function initCategories() {
    const categories = await fetchCategories();
    renderCategories(categories);
}

initCategories()

// async function ApiAjax() {
//     const api = `${API_BASE_URL}/products`

//     listaCatalogo.innerhtml = '<a class="category-link">Carregando catalogo...</a>'

//     fetch(api).then(response => {
//         if(!response.ok) {
//             throw new Error("Erro ao carregar dados " + response.status)
//         }

//         return response.json()
//     }).then(data => {
//         const categorias = data.catalogo

//         listaContainer.innerhtml = ''

//         categorias.forEach(item => {
//             const a = document.createElement('a')

//             a.classList.add('category-link')

//             a.href = `../paginas/${item.link}`

//             a.textContent = `${item.categoria}`

//             listaContainer.appendChild(a)
//         });

//         console.log("Dados carregados com sucesso:", data)

//         console.log("Dado do catalogo: ", data.catalogo[1].categoria)
//     }).catch(error => {
//         console.log("Houve um problema:", error)
//     });
// }
