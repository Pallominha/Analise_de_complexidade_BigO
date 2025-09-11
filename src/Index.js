const { performance } = require('perf_hooks');
// Função para gerar vetor aleatório de tamanho n
function getVetor(n) {
    const vetor = [];
    for (let i = 0; i < n; i++) {
      vetor.push(Math.round(Math.random() * 1000000));
    }
    return vetor;
  }
  
  // Método Bolha - versão 1
  function bolha(vetor) {
    let comparacoes = 0;
    let trocas = 0;
    const n = vetor.length;
    const arr = vetor.slice(); // copia para não alterar o original
  
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - 1 - i; j++) {
        comparacoes++;
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          trocas++;
        }
      }
    }
    return { vetorOrdenado: arr, comparacoes, trocas };
  }
  
  // Método Bolha - versão 2 (com flag para otimizar)
  function bolha2(vetor) {
    let comparacoes = 0;
    let trocas = 0;
    const n = vetor.length;
    const arr = vetor.slice();
  
    for (let i = 0; i < n - 1; i++) {
      let trocou = false;
      for (let j = 0; j < n - 1 - i; j++) {
        comparacoes++;
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          trocas++;
          trocou = true;
        }
      }
      if (!trocou) break; // vetor já ordenado
    }
    return { vetorOrdenado: arr, comparacoes, trocas };
  }
  
  // Ordenação por Inserção
  function insercao(vetor) {
    let comparacoes = 0;
    let trocas = 0;
    const n = vetor.length;
    const arr = vetor.slice();
  
    for (let i = 1; i < n; i++) {
      let chave = arr[i];
      let j = i - 1;
      while (j >= 0) {
        comparacoes++;
        if (arr[j] > chave) {
          arr[j + 1] = arr[j];
          trocas++;
          j--;
        } else {
          break;
        }
      }
      arr[j + 1] = chave;
    }
    return { vetorOrdenado: arr, comparacoes, trocas };
  }
  
  // Ordenação por Seleção
  function selecao(vetor) {
    let comparacoes = 0;
    let trocas = 0;
    const n = vetor.length;
    const arr = vetor.slice();
  
    for (let i = 0; i < n - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < n; j++) {
        comparacoes++;
        if (arr[j] < arr[minIndex]) {
          minIndex = j;
        }
      }
      if (minIndex !== i) {
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        trocas++;
      }
    }
    return { vetorOrdenado: arr, comparacoes, trocas };
  }
  
  // Função para gerar vetor ordenado crescente
  function vetorOrdenado(n) {
    const arr = [];
    for (let i = 0; i < n; i++) {
      arr.push(i);
    }
    return arr;
  }
  
  // Função para gerar vetor ordenado decrescente
  function vetorDecrescente(n) {
    const arr = [];
    for (let i = n; i > 0; i--) {
      arr.push(i);
    }
    return arr;
  }
  
  // Função para medir tempo e coletar dados de execução
  function testarOrdenacao(algoritmo, vetor) {
    const inicio = performance.now();
    const resultado = algoritmo(vetor);
    const fim = performance.now();
    const tempo = fim - inicio;
    return { tempo, comparacoes: resultado.comparacoes, trocas: resultado.trocas };
  }
  // Função para executar testes e gerar CSV com tempos
  async function gerarCSVTempos() {
    const tamanhos = [1000, 5000, 10000, 15100, 20000, 25000, 30000, 35000, 40000, 45000, 50000];
    const algoritmos = [
      { nome: "Bolha", func: bolha },
      { nome: "Bolha 2ª versão", func: bolha2 },
      { nome: "Inserção", func: insercao },
      { nome: "Seleção", func: selecao },
    ];
    const tiposVetores = [
      { nome: "Ordenado", func: vetorOrdenado },
      { nome: "Decrescente", func: vetorDecrescente },
      { nome: "Aleatório", func: getVetor },
    ];
  
    // Cabeçalho CSV
    let csv = "Algoritmo,Tipo Vetor,Tamanho,Tempo(ms),Comparações,Trocas\n";
    for (const algoritmo of algoritmos) {
      for (const tipo of tiposVetores) {
        for (const n of tamanhos) {

          console.log(`Testando ${algoritmo.nome} com vetor ${tipo.nome} de tamanho ${n}...`);
          const vetor = tipo.func(n);
          const {tempo, comparacoes, trocas} = testarOrdenacao(algoritmo.func, vetor);

          csv += `${algoritmo.nome},${tipo.nome},${n},${tempo.toFixed(2)},${comparacoes},${trocas}\n`;

          // Pequena pausa para não travar o navegador
          //await new Promise(r => setTimeout(r, 10));
        }
      }
    }
    console.log("CSV gerado:\n", csv);
    // Você pode copiar o conteúdo do console e salvar em um arquivo .csv para abrir no Excel
    return csv;
  }
  // Executa e gera CSV
  gerarCSVTempos();