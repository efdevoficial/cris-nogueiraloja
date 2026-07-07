const ADMIN_KEY = "cris_admin_session";

const ADMIN_EMAIL = "admin@crisnogueira.com";
const ADMIN_PASSWORD = "123456";

const form = document.getElementById("adminLoginForm");

if (form) {
    form.addEventListener("submit", event => {
        event.preventDefault();

        const email = document.getElementById("email").value.trim().toLowerCase();
        const password = document.getElementById("password").value.trim();

        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            sessionStorage.setItem(ADMIN_KEY, "true");
            window.location.href = "./admin.html";
        } else {
            alert("Email ou senha incorretos.");
        }
    });
}

function protectAdmin() {
    const isLogged = sessionStorage.getItem(ADMIN_KEY);

    if (isLogged !== "true") {
        window.location.href = "./login-admin.html";
    }
}

function logoutAdmin() {
    sessionStorage.removeItem(ADMIN_KEY);
    window.location.href = "./login-admin.html";
}