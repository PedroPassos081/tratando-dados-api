async function BuscaEndereco(cep) {
  var mensagemErro = document.getElementById("erro");
  mensagemErro.innerHTML = "";
  try {
    var consultaCep = await fetch(`https://viacep.com.br/ws/${cep}/json`);
    var consultaCepConvertida = await consultaCep.json();
    if (consultaCepConvertida.erro) {
      throw Error("Cep nao existe!");
    }
    var cidade = document.getElementById("cidade");
    var logradouro = document.getElementById("endereco");
    var estado = document.getElementById("estado");

    cidade.value = consultaCepConvertida.localidade;
    logradouro.value = consultaCepConvertida.logradouro;
    estado.value = consultaCepConvertida.uf;
    bairro.value = consultaCepConvertida.bairro;
    console.log(consultaCepConvertida);
    return consultaCepConvertida;
  } catch (erro) {
    mensagemErro.innerHTML = `<p>CEP inválido.</p>`;
    console.log(erro);
  }
}
let ceps = ["01001000", "01001001"];
let conjuntoCeps = ceps.map((valores) => BuscaEndereco(valores));
console.log(conjuntoCeps);
Promise.all(conjuntoCeps).then((respostas) => console.log(respostas));

var cep = document.getElementById("cep");
cep.addEventListener("focusout", () => BuscaEndereco(cep.value));
