// Inicialização geral 
import { updateCartCount } from "./CartRender.js";
import { renderCart } from "./CartRender.js";
import { initCartEvents } from "./CartEvents.js";

export const API_BASE_URL = 'http://localhost/api-ecommerce/api';
export const TOKEN_KEY = 'token';
export const USER_ID_KEY = 'user_id';
export const USER_NAME_KEY = 'nome_usuario';
export function saveAuthData(token, userId, userName) { 
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_ID_KEY, userId);
    localStorage.setItem(USER_NAME_KEY, userName);
    console.log(`Usuário logado: ${userName}. Token salvo.`);
}

export function getAuthToken() {
    return localStorage.getItem(TOKEN_KEY);
}

export function logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_ID_KEY);
    localStorage.removeItem(USER_NAME_KEY);
    window.location.href = 'login.html';
}

async function handleRegister(e) {
    e.preventDefault();

    const nomeInput = document.getElementById('register-nome');
    const emailInput = document.getElementById('register-email');
    const senhaInput = document.getElementById('register-senha');

    const nome = nomeInput.value;
    const email = emailInput.value;
    const senha = senhaInput.value;
    
    if (!nome || !email || !senha) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, email, senha })
        });

        const data = await response.json();

        if (response.ok) {
            saveAuthData(data.token, data.user_id, data.nome_usuario);
            alert("Cadastro realizado com sucesso! Você será redirecionado.");
            window.history.back(); 
        } else {
            alert(`Erro ao cadastrar: ${data.error || 'Ocorreu um erro desconhecido.'}`);
        }

    } catch (error) {
        console.error('Erro na comunicação com a API de cadastro:', error);
        alert('Falha ao conectar ao servidor. Verifique a URL da API.');
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }

    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', logout);
    }
    
    console.log("Script main.js carregado com sucesso.");

    initCartEvents();
    updateCartCount();

    if (document.getElementById("shopping-cart")) {
        renderCart();
    }
});

