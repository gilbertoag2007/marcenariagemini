// Calcula e apresenta o plano de corte para o movel
function gerarPlanoDeCorte() {

  let campoPreenchido = 1;

  // recupera os valores digitados
  const largura = document.getElementById("largura").value;
  campoPreenchido = validaCamposObrigatorios("largura", largura);

  const altura = document.getElementById("altura").value;
  campoPreenchido = validaCamposObrigatorios("altura", altura);

  const profundidade = document.getElementById("profundidade").value;
  campoPreenchido = validaCamposObrigatorios("profundidade", profundidade);

  const quantidadePrateleiras = document.getElementById("prateleiras").value;
  campoPreenchido = validaCamposObrigatorios("prateleira", quantidadePrateleiras);

  //Calcula plano de corte apenas se campos obrigatorios estiverem preenchidos.
  if (campoPreenchido === 1) {
    const modelo = obterModelo();

    let base = calculaBaseTeto(profundidade, largura);
    let laterais = calculaLaterais(profundidade, altura);
    let teto = calculaBaseTeto(profundidade, largura);
    let fundo = calcularDimensoesFundo(altura, largura);
    let portas = calcularDimensoesPortas(modelo, altura, largura);
    let prateleiras = calculaPrateleiras(profundidade, largura, quantidadePrateleiras);

    apresentaPlanoCorte(base, laterais, teto, fundo, portas, prateleiras);
    apresentaImagem(altura, largura, profundidade);
  }
}

/* Verifica se campos obritorios estao preenchidos. Retorna 1 se estiver ou 0 se não.*/
function validaCamposObrigatorios(nome, valor) {
  let preenchido;

  if (valor === null) {
    preenchido = 0;

  } else if (valor.length < 1) {
    preenchido = 0;

  } else {
    preenchido = 1;

  }

  if (preenchido === 0) {
    alert("Preencha o campo " + nome + ".");
  }
  
  return preenchido;
}

// Calcula a quantidade de portas e respectivas dimensoes
function calcularDimensoesPortas(modelo, altura, largura) {

  if (modelo == 1) {// Armário multiuso simples

    let alturaPorta = (altura - 1);
    let larguraPorta = (largura - 1) / 2
    let observacaoPortas = "Redução de 1 cm na altura e largura das portas para melhor acabamento.";
    
    return formatarResultadoQuantidadePecas(2, 15, alturaPorta, larguraPorta, observacaoPortas);

  } else {

    return 'Modelo  - Não disponível';

  }

}

//Calcula a dimensoes do fundo do movel
function calcularDimensoesFundo(altura, largura) {

  let alturaFundo = altura - 1;
  let larguraFundo = largura - 1;
  let observacaoFundo = "Redução de 1 cm na altura e largura para melhor acabamento."
  let dimensaoFundo = formatarResultadoQuantidadePecas(1, 6, alturaFundo, larguraFundo, observacaoFundo);
  return dimensaoFundo;

}
// Calcula a dimensao da base e teto
function calculaBaseTeto(profundidade, largura) {
  
  let dimensaoBase = formatarResultadoQuantidadePecas(1, 15, profundidade, largura, null);
  return dimensaoBase;

}

// Calcula a dimensao das pecas laterais do movel
function calculaLaterais(profundidade, altura) {
  
  let alturaCalculada = altura - 3;// Descontado 3cm para conta da base e teto de 1,5cm
  let dimensaoLateral = formatarResultadoQuantidadePecas(2, 15, alturaCalculada, profundidade, null);
  return dimensaoLateral;
  
}

function calculaPrateleiras(profundidade, largura, quantidadePrateleiras) {

  let larguraRecalculada = (largura - 3);// Descontado 3cm para conta de 2 laterais de 1,5cm
  let dimensaoBase = formatarResultadoQuantidadePecas(quantidadePrateleiras, 15, profundidade, larguraRecalculada, null);

  return dimensaoBase;
}

// Formata o texto de quantidade de peças 
function formatarResultadoQuantidadePecas(quantidadePecas, espessura, altura, largura, observacao) {

  let resultado;
  let pecasFormatada;
  let observacaoFormatada;

  if (quantidadePecas == 1) {
    pecasFormatada = "<li> 1 peça de mdf(" + espessura + "mm) de " + altura + "cm x " + largura + "cm. </li>";
  
  } else {
    pecasFormatada = "<li>" + quantidadePecas + " peças de mdf(" + espessura + ")mm de " + altura + "cm x " + largura + "cm. </li>";
  
  }
  
  resultado = pecasFormatada;

  if (observacao != null) {

    if (observacao.length > 0) {
      observacaoFormatada = "<p><strong>Observação:</strong>" + observacao + "</p>";
      resultado = resultado + observacaoFormatada;
    }
  
  }

  return resultado;

}
// Apresenta o plano de corte na tela 
function apresentaPlanoCorte(base, laterais, teto, fundo, portas, prateleiras) {
  
  let divResultado = document.getElementById("resultado-plano-corte");
  let resultadoFormatado = "<h2>Plano de Corte</h2>"
    + "<h3>Base</h3>"
    + "<ul>"
    + base
    + "</ul>"

    + "<h3>Laterias</h3>"
    + "<ul>"
    + laterais
    + "</ul>"

    + "<h3>Teto</h3>"
    + "<ul>"
    + teto
    + "</ul>"

    + "<h3>Fundo</h3>"
    + "<ul>"
    + fundo
    + "</ul>"

    + "<h3>Portas</h3>"
    + "<ul>"
    + portas
    + "</ul>"

    + "<h3>Prateleiras</h3>"
    + "<ul>"
    + prateleiras
    + "</ul>"
    + "<br>"

  divResultado.innerHTML = resultadoFormatado;
}

// Gera imagem do movel com a altura, largura e profundidade informada.
function apresentaImagem(altura, largura, profundidade) {
  let divContainerImagem = document.getElementById("container-imagem");

  let resultado = '<hr>'

    + '<center><p>Imagem meramenta ilustrativa. </p></center>'
    + '<center>'
    + '<div class="imagem_modelo1">'
    + '<div class="altura"> A= ' + altura + ' cm</div>'
    + '<div class="largura"> L= ' + largura + ' cm</div>'
    + ' <div class="profundidade"> P= ' + profundidade + ' cm</div>';
  + '</div>'
    + '</center>'

    ;
    
    divContainerImagem.innerHTML = resultado;

  return divContainerImagem

}

//recupera o modelo informado na pagina
function obterModelo() {
  const modelos = document.getElementsByName('modelo');
  for (let i = 0; i < modelos.length; i++) {
    if (modelos[i].checked) {
      return modelos[i].value;
    }
    break;
  }

}