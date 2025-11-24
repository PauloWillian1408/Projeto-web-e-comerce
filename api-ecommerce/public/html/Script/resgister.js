import { API_BASE_URL, saveAuthData } from './main.js';

document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
});

async function handleRegister(e) {
    e.preventDefault();

    const nomeInput = document.getElementById('register-nome');
    const emailInput = document.getElementById('register-email');
    const senhaInput = document.getElementById('register-senha');

    const nome = nomeInput.value.trim();
    const email = emailInput.value.trim();
    const senha = senhaInput.value;

    if (!nome || !email || !senha) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    try {
        // Ajuste: Envia 'nome' em vez de 'nome_usuario'
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome: nome, email, senha })
        });

        const data = await response.json();

        if (response.ok) {
            // Salva os dados de autenticação (token, user_id, nome)
            saveAuthData(data.token, data.user_id, data.nome_usuario);
            alert("Cadastro realizado com sucesso! Você será redirecionado para o login.");
            window.location.href = 'login.html';  // Redireciona para a página de login
        } else {
            alert(`Erro ao cadastrar: ${data.error || 'Ocorreu um erro desconhecido.'}`);
        }
    } catch (error) {
        console.error('Erro na comunicação com a API de cadastro:', error);
        alert('Falha ao conectar ao servidor. Verifique a URL da API.');
    }
}