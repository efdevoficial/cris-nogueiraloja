const themeToggle = document.getElementById("themeToggle");

/**
 * Retorna o tema salvo ou o tema do sistema.
 */
function getPreferredTheme() {
    const savedTheme = localStorage.getItem("cris-theme");

    if (savedTheme === "light" || savedTheme === "dark") {
        return savedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
}

/**
 * Aplica o tema.
 */
function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);

    if (!themeToggle) return;

    const isDark = theme === "dark";

    themeToggle.textContent = isDark ? "☀️" : "🌙";

    themeToggle.setAttribute(
        "aria-label",
        isDark
            ? "Ativar tema claro"
            : "Ativar tema escuro"
    );

    themeToggle.setAttribute(
        "title",
        isDark
            ? "Tema Claro"
            : "Tema Escuro"
    );

    themeToggle.setAttribute(
        "aria-pressed",
        String(isDark)
    );
}

/**
 * Inicializa o tema.
 */
document.addEventListener("DOMContentLoaded", () => {

    applyTheme(getPreferredTheme());

    themeToggle?.addEventListener("click", () => {

        const currentTheme =
            document.documentElement.getAttribute("data-theme") || "light";

        const newTheme =
            currentTheme === "dark"
                ? "light"
                : "dark";

        localStorage.setItem("cris-theme", newTheme);

        applyTheme(newTheme);

    });

});