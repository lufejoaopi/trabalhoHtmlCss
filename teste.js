let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

function mostrarTela(telaId) {
    document.querySelectorAll('.tela').forEach(tela => {
        tela.classList.remove('ativa');
    });
    document.getElementById(telaId).classList.add('ativa');
}

function adicionarAoCarrinho(produto, preco) {
    const itemExistente = carrinho.find(item => item.produto === produto);
    if (itemExistente) {
        itemExistente.quantidade++;
    } else {
        carrinho.push({ produto, preco, quantidade: 1 });
    }
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    alert('Produto adicionado ao carrinho!');
}

function removerDoCarrinho(index) {
    carrinho.splice(index, 1);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    atualizarCarrinho();
}

function atualizarCarrinho() {
    const carrinhoConteudo = document.getElementById('carrinho-conteudo');
    if (!carrinhoConteudo) return;  // Verifica se o elemento existe na página
    carrinhoConteudo.innerHTML = '';
    let total = 0;

    carrinho.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.textContent = `${item.quantidade} x ${item.produto} - R$ ${(item.preco * item.quantidade).toFixed(2)}`;
        const removerButton = document.createElement('button');
        removerButton.textContent = 'Remover';
        removerButton.onclick = () => removerDoCarrinho(index);
        itemDiv.appendChild(removerButton);
        carrinhoConteudo.appendChild(itemDiv);
        total += item.preco * item.quantidade;
    });

    document.getElementById('total-preco').textContent = `Total: R$ ${total.toFixed(2)}`;
}

function irParaCarrinho() {
    window.location.href = 'carrinho.html';
}

function voltarParaProdutos() {
    window.location.href = 'produtos.html';
}

// Mostra a tela inicial ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('carrinho-conteudo')) {
        atualizarCarrinho();
    } else {
        mostrarTela('produtos');
    }
});