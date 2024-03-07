let tabelaProdutos = document.querySelector(".tabela-produtos");
let inputProdutoNovo = document.getElementById('produto-novo');
let inputPrice = document.getElementById('preco-novo');

//Acessando o modal
let idEdit = document.getElementById('edit-id');
let produtoEdit = document.getElementById('edit-produto');
let precoEdit = document.getElementById('edit-preco');
let saveEdit = document.getElementById('save-edit');

//Busca
let inputSearch = document.getElementById('search');
console.log(inputSearch);

//Filtrando na tabela de produtos
inputSearch.addEventListener('keyup', () => {
    fetch('http://localhost:3000/produtos')
        .then(response => response.json())
        .then(products => {
            tabelaProdutos.innerHTML = '';

            const filteredProducts = products.filter(product => product.produto.toLowerCase().includes(inputSearch.value.toLowerCase()));
            filteredProducts.forEach(item => {
                tabelaProdutos.innerHTML += `
        <tr>
            <td>${item.id}</td>
            <td>${item.produto}</td>
            <td>${item.preco}</td>
            <td>
                <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="preencheModal(${item.id})">
                    <img src="assets/image/pencil-square.svg" alt="icon-edit" class="icon">
                </button>
            </td>
            <td>
                <button class="btn btn-danger" onclick="deleteProduct(${item.id})"> 
                    <img src="assets/image/trash-fill.svg" alt="icon-trash" class="icon">
                </button>
            </td>
        </tr>
        `
            });
        });
});


//PUT
saveEdit.addEventListener('click', () => {
    fetch(`http://localhost:3000/produtos/${idEdit.value}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "produto": produtoEdit.value,
            "preco": precoEdit.value
        }),
    });
});

function preencheModal(id) {
    fetch(`http://localhost:3000/produtos/${id}`)
        .then(response => response.json())
        .then(produto => {
            idEdit.value = produto.id;
            produtoEdit.value = produto.produto;
            precoEdit.value = produto.preco;
        });
}


//Variável auxiliar para add ids novos junto com novos produtos
let listaTamanho = 0;

//POST
const btnPost = document.getElementById('btn-post').addEventListener('click', () => {
    fetch('http://localhost:3000/produtos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "id": `${listaTamanho + 1}`,
            "produto": inputProdutoNovo.value,
            "preco": inputPrice.value
        }),
    });
});

//GET
fetch('http://localhost:3000/produtos')
    .then(response => response.json())
    .then(produtos => {

        produtos.forEach(item => {
            tabelaProdutos.innerHTML += `
        <tr>
            <td>${item.id}</td>
            <td>${item.produto}</td>
            <td>${item.preco}</td>
            <td>
                <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="preencheModal(${item.id})">
                    <img src="assets/image/pencil-square.svg" alt="icon-edit" class="icon">
                </button>
            </td>
            <td>
                <button class="btn btn-danger" onclick="deleteProduct(${item.id})"> 
                    <img src="assets/image/trash-fill.svg" alt="icon-trash" class="icon">
                </button>
            </td>
        </tr>
        `
            listaTamanho++;
        });

    });

//DELETE
function deleteProduct(id) {
    fetch(`http://localhost:3000/produtos/${id}`, {
        method: 'DELETE'
    });
};
