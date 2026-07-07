const STORAGE_KEY = "cris_produtos";

const produtosPadrao = [
    {
        id: 1,
        nome: "Lingerie Renda Luxo",
        categoria: "Lingerie",
        preco: "89,90",
        estoque: 5,
        descricao: "Peça delicada e confortável.",
        imagem: "",
        status: "disponivel"
    },
    {
        id: 2,
        nome: "Pijama Feminino Premium",
        categoria: "Pijama",
        preco: "119,90",
        estoque: 3,
        descricao: "Pijama confortável para noites especiais.",
        imagem: "",
        status: "disponivel"
    },
    {
        id: 3,
        nome: "Kit Delicadeza",
        categoria: "Kit",
        preco: "159,90",
        estoque: 2,
        descricao: "Kit especial para presentear com carinho.",
        imagem: "",
        status: "disponivel"
    }
];

function getProdutos() {
    const produtos = JSON.parse(localStorage.getItem(STORAGE_KEY));

    if (!produtos) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(produtosPadrao));
        return produtosPadrao;
    }

    return produtos;
}

const productsGrid = document.getElementById("productsGrid");

function carregarProdutos() {
    if (!productsGrid) return;

    const produtos = getProdutos();

    const produtosDisponiveis = produtos.filter(produto => {
        return produto.status === "disponivel" && Number(produto.estoque) > 0;
    });

    productsGrid.innerHTML = "";

    if (produtosDisponiveis.length === 0) {
        productsGrid.innerHTML = `
            <div class="empty-products">
                <h3>Em breve, novidades por aqui ✨</h3>
                <p>Nossa coleção estará disponível em breve.</p>
            </div>
        `;
        return;
    }

    produtosDisponiveis.forEach(produto => {
        const imagemProduto = produto.imagem
            ? `<img src="${produto.imagem}" alt="${produto.nome}">`
            : `<span>${getEmojiCategoria(produto.categoria)}</span>`;

        productsGrid.innerHTML += `
            <article class="product-card">

                <div class="product-image">
                    ${imagemProduto}
                </div>

                <span class="product-category">
                    ${produto.categoria}
                </span>

                <h3>${produto.nome}</h3>

                <p>${produto.descricao}</p>

                <span class="price">
                    R$ ${produto.preco}
                </span>

                <small class="stock">
                    Estoque: ${produto.estoque} unidade(s)
                </small>

                <button
                    class="btn-primary"
                    onclick="consultarInstagram('${produto.nome}')">

                    Consultar no Instagram

                </button>

            </article>
        `;
    });
}

function getEmojiCategoria(categoria) {
    const emojis = {
        Lingerie: "🌸",
        Pijama: "🌙",
        Kit: "🎁",
        Novidade: "✨"
    };

    return emojis[categoria] || "🛍️";
}

function consultarInstagram(produto) {
    alert(`Você será redirecionado para o Instagram para consultar: ${produto}`);

    window.open(
        "https://www.instagram.com/crisnogueira.rendasesonhos/",
        "_blank"
    );
}

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", event => {
        event.preventDefault();

        const destino = document.querySelector(link.getAttribute("href"));

        if (destino) {
            destino.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});

const elementos = document.querySelectorAll(
    ".benefits article, .category-card, .product-card, .section-title, .contact-card"
);

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, {
    threshold: 0.15
});

elementos.forEach(item => {
    item.style.opacity = "0";
    item.style.transform = "translateY(45px)";
    item.style.transition = ".7s";
    observer.observe(item);
});

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 80) {
        header.style.boxShadow = "0 10px 35px rgba(0,0,0,.12)";
    } else {
        header.style.boxShadow = "none";
    }
});

const footer = document.querySelector("footer small");

if (footer) {
    footer.innerHTML =
        `© ${new Date().getFullYear()} Cris Nogueira Rendas & Sonhos • Desenvolvido por <strong>EFDev</strong>`;
}

carregarProdutos();