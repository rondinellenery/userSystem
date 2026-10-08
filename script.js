const form= document.querySelector("#formCadastro");
const buscarCep = document.querySelector("#buscarCep");
const cep = document.querySelector("#cep");

//escuta o evento do formulario

form.addEventListener("submit", function(event) {
    event.preventDefault();
    console.log(Object.fromEntries([...form.elements]
        .filter(element => element.id)
        .map(element => [element.id, element.value])
    ));
    form.reset();
});

buscarCep.addEventListener("click", async function() {
    const valor = cep.value.replace(/\D/g, '');
    if (valor.length !== 8) {
        alert("CEP inválido. Digite um CEP com 8 dígitos.");
        return;

    } try {
        const resposta=await fetch(`https://viacep.com.br/ws/${valor}/json/`);
        const dados=await resposta.json();
        if (!resposta.ok || dados.erro)
            throw new Error("CEP não encontrado.");
        document.querySelector("#logradouro").value = dados.logradouro;
        document.querySelector("#bairro").value = dados.bairro;
        document.querySelector("#cidade").value = dados.localidade;
        document.querySelector("#estado").value = dados.uf;
    } catch (erro) {
        alert("Erro capturado: " + erro.message);

    }
    console.log(valor);
});
