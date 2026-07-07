protectAdmin();

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

function salvarProdutos(produtos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(produtos));
}

let produtos = getProdutos();

const form = document.getElementById("productForm");
const productId = document.getElementById("productId");
const nome = document.getElementById("nome");
const categoria = document.getElementById("categoria");
const preco = document.getElementById("preco");
const estoque = document.getElementById("estoque");
const descricao = document.getElementById("descricao");
const imagem = document.getElementById("imagem");
const statusProduto = document.getElementById("status");

const productsList = document.getElementById("productsList");
const searchProduct = document.getElementById("searchProduct");

const totalProdutos = document.getElementById("totalProdutos");
const produtosDisponiveis = document.getElementById("produtosDisponiveis");
const produtosEsgotados = document.getElementById("produtosEsgotados");
const formTitle = document.getElementById("formTitle");
const cancelEdit = document.getElementById("cancelEdit");

function atualizarCards() {
    totalProdutos.textContent = produtos.length;

    produtosDisponiveis.textContent = produtos.filter(
        produto => produto.status === "disponivel" && Number(produto.estoque) > 0
    ).length;

    produtosEsgotados.textContent = produtos.filter(
        produto => produto.status === "esgotado" || Number(produto.estoque) === 0
    ).length;
}

function renderizarProdutos(lista = produtos) {
    productsList.innerHTML = "";

    if (lista.length === 0) {
        productsList.innerHTML = `
            <p style="color:#786663;">
                Nenhum produto encontrado.
            </p>
        `;
        return;
    }

    lista.forEach(produto => {
        const item = document.createElement("article");
        item.className = "product-item";

        const imagemProduto = produto.imagem
            ? produto.imagem
            : "https://via.placeholder.com/200x200?text=Produto";

        item.innerHTML = `
            <img src="${imagemProduto}" alt="${produto.nome}">

            <div class="product-info">
                <h3>${produto.nome}</h3>
                <p>${produto.categoria} • R$ ${produto.preco}</p>
                <p>Estoque: ${produto.estoque} unidade(s)</p>
                <p>Status: ${produto.status === "disponivel" ? "Disponível" : "Esgotado"}</p>
            </div>

            <div class="product-actions">
                <button class="edit" onclick="editarProduto(${produto.id})">
                    Editar
                </button>

                <button class="delete" onclick="excluirProduto(${produto.id})">
                    Excluir
                </button>
            </div>
        `;

        productsList.appendChild(item);
    });
}

function limparFormulario() {
    productId.value = "";
    nome.value = "";
    categoria.value = "Lingerie";
    preco.value = "";
    estoque.value = "";
    descricao.value = "";
    imagem.value = "";
    statusProduto.value = "disponivel";
    formTitle.textContent = "Cadastrar Produto";
}

form.addEventListener("submit", event => {
    event.preventDefault();

    const dadosProduto = {
        id: productId.value ? Number(productId.value) : Date.now(),
        nome: nome.value.trim(),
        categoria: categoria.value,
        preco: preco.value.trim(),
        estoque: Number(estoque.value),
        descricao: descricao.value.trim(),
        imagem: imagem.value.trim(),
        status: statusProduto.value
    };

    if (productId.value) {
        produtos = produtos.map(produto => {
            return produto.id === dadosProduto.id ? dadosProduto : produto;
        });

        alert("Produto atualizado com sucesso!");
    } else {
        produtos.push(dadosProduto);

        alert("Produto cadastrado com sucesso!");
    }

    salvarProdutos(produtos);
    limparFormulario();
    atualizarCards();
    renderizarProdutos();
});

function editarProduto(id) {
    const produto = produtos.find(item => item.id === id);

    if (!produto) return;

    productId.value = produto.id;
    nome.value = produto.nome;
    categoria.value = produto.categoria;
    preco.value = produto.preco;
    estoque.value = produto.estoque;
    descricao.value = produto.descricao;
    imagem.value = produto.imagem;
    statusProduto.value = produto.status;

    formTitle.textContent = "Editar Produto";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function excluirProduto(id) {
    const confirmar = confirm("Deseja realmente excluir este produto?");

    if (!confirmar) return;

    produtos = produtos.filter(produto => produto.id !== id);

    salvarProdutos(produtos);
    atualizarCards();
    renderizarProdutos();
}

searchProduct.addEventListener("input", () => {
    const busca = searchProduct.value.toLowerCase();

    const filtrados = produtos.filter(produto => {
        return (
            produto.nome.toLowerCase().includes(busca) ||
            produto.categoria.toLowerCase().includes(busca)
        );
    });

    renderizarProdutos(filtrados);
});

cancelEdit.addEventListener("click", limparFormulario);

atualizarCards();
renderizarProdutos();