import { 
    API_BASE_URL, 
    saveAuthData, 
} from './main.js';

/**
 * Manipula o envio do formulário de login.
 * @param {Event} e 
 */
async function handleLogin(e) { 
    e.preventDefault(); // Impede o recarregamento padrão da página

    const emailInput = document.getElementById('login-email');
    const senhaInput = document.getElementById('login-senha');

    const email = emailInput.value;
    const senha = senhaInput.value;
    
    if (!email || !senha) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, senha })
        });

        const data = await response.json();

        if (response.ok) {
            // Sucesso: Salva os dados de autenticação
            saveAuthData(data.token, data.user_id, data.nome_usuario);
            
            // Mensagem de Sucesso
            alert("Login feito com sucesso!");
            
            console.log(`Sucesso no Login: O usuário ${data.nome_usuario} foi autenticado.`);
            
            // Redireciona para a página anterior
            window.history.back(); 

        } else {
            // Falha: Exibe a mensagem de erro da API
            alert(`Erro ao fazer login: ${data.error || 'Credenciais inválidas.'}`);
        }

    } catch (error) {
        console.error('Erro na comunicação com a API de login:', error);
        alert('Falha ao conectar ao servidor. Verifique a URL da API e se o PHP está rodando.');
    }
}

// ===============================================
// INICIALIZAÇÃO DA PÁGINA DE LOGIN
// ===============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log("Script login.js carregado e vinculando evento de login."); 
    
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin); 
        console.log("Formulário de Login encontrado e evento anexado.");
    }
});