# Analise de complexidade BigO
-----

# 📊 Análise Comparativa de Métodos de Ordenação Simples

Comparação entre os métodos de ordenação simples. Identificação da complexidade dos algoritmos implementados (notação Big O). Obtendo vetores com números ordenados, números ordenados de forma decrescente e números aleatórios. Apresentando o gráfico comparativo de (Quantidade de comparações, Quantidade de trocas e Tempo de execução em milisegundos).

### 🔢 Geração dos Vetores

Foram criados vetores de diferentes tamanhos para cada um dos seguintes cenários:

1.  **Vetor com Números Aleatórios**: Representa o caso médio, onde os elementos não possuem uma ordem predefinida.
2.  **Vetor Ordenado de Forma Decrescente**: Representa o pior caso para Bubble Sort e Insertion Sort, exigindo o número máximo de comparações e trocas.
3.  **Vetor Já Ordenado**: Representa o melhor caso, testando a capacidade dos algoritmos de lidar com dados já estruturados.

### 📈 Métricas Coletadas

Para cada execução e para cada algoritmo, foram registradas as seguintes métricas:

1.  **Quantidade de Comparações**: Número de vezes que dois elementos do vetor foram comparados entre si.
2.  **Quantidade de Trocas**: Número de vezes que dois elementos do vetor trocaram de posição.
3.  **Tempo de Execução**: Tempo total, medido em milissegundos (ms), para ordenar o vetor por completo.

## 📊 Análise BigO de cada método

### Método Bolha - versão 1
<pre>
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
</pre>

### Método Bolha - versão 2
<pre>
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
</pre>

### Ordenação por Inserção
<pre>
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
</pre>

### Ordenação por Seleção
<pre>
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
</pre>


| Algoritmo           | Melhor Caso | Caso Médio | Pior Caso | Explicação |
|--------------------|-------------|------------|-----------|------------|
| **Bolha v1**       | O(n²)       | O(n²)      | O(n²)     | Sempre percorre os pares de elementos, fazendo comparações; no pior caso precisa trocar quase todos. |
| **Bolha v2 (com flag)** | O(n)     | O(n²)      | O(n²)     | A flag interrompe o loop se o vetor já estiver ordenado (melhor caso), mas no pior caso percorre tudo. |
| **Inserção**       | O(n)        | O(n²)      | O(n²)     | No melhor caso (vetor ordenado) só faz uma comparação por elemento; no pior caso (decrescente) move cada elemento até o início. |
| **Seleção**        | O(n²)       | O(n²)      | O(n²)     | Sempre percorre o restante do vetor para encontrar o mínimo; número de comparações é quadrático, mas trocas são apenas O(n). |


## 💹 Resultados e Gráficos

Os resultados coletados foram plotados em gráficos para facilitar a visualização e a comparação do desempenho dos algoritmos em cada cenário.

**NOTA**: Os gráficos abaixo são representações ilustrativas dos resultados esperados.

### Gráfico 01: Comparação - Vetor Ordenado

![Gráfico 01: Comparação - Vetor Ordenado](https://github.com/user-attachments/assets/25256102-3b37-4604-a45f-3543c9781a2b)

- Seleção e Bolha possuem o mesmo número de comparações
- Bolha 2ª versão e Inserção possuem o mesmo número de comparações

### Gráfico 02: Comparação - Vetor Decrescente


![Gráfico 02: Comparação - Vetor Decrescente](https://github.com/user-attachments/assets/e79ce5ae-43b0-4b2d-9b11-5c7a47946e87)

- Todos possuem o mesmo número de comparações

### Gráfico 03: Comparação - Vetor Aleatório

![Gráfico 03: Comparação - Vetor Aleatório](https://github.com/user-attachments/assets/72b32157-544e-488c-8996-1dc3b3767ef7)

- Bolha, Bolha 2ª versão e Seleção possuem o mesmo número de comparações
- Apenas Inserção diferente

### Gráfico 04: Trocas - Vetor Ordenado

![Gráfico 04: Trocas - Vetor Ordenado](https://github.com/user-attachments/assets/a5cd5c1c-8cd7-4237-b212-8afe2b48d700)

- Todos não possuem trocas

### Gráfico 05: Trocas - Vetor Decrescente

![Gráfico 05: Trocas - Vetor Decrescente](https://github.com/user-attachments/assets/54fec156-4ec0-43fc-8d60-55aa271152e5)

- Apenas seleção é diferente

### Gráfico 06: Trocas - Vetor Aleatório

![Gráfico 06: Trocas - Vetor Aleatório](https://github.com/user-attachments/assets/f54b1ad4-92b9-4327-99c7-7f31b1c5d6b7)

- Apenas seleção é diferente (valor dos outros possui pouca diferença)

### Gráfico 07: Tempo(ms) - Vetor Ordenado


![Gráfico 07: Tempo(ms) - Vetor Ordenado](https://github.com/user-attachments/assets/1fbd70ac-02c4-4657-b94a-d3c43bfbeeca)

- Bolha 2ª versão e inserção possuem tempos próximos.

### Gráfico 08: Tempo(ms) - Vetor Decrescente


![Gráfico 08: Tempo(ms) - Vetor Decrescente](https://github.com/user-attachments/assets/07abc485-08ff-46e7-aba9-7c8cddcf5e3c)


### Gráfico 09: Tempo(ms) - Vetor Aleátorio



![Gráfico 09: Tempo(ms) - Vetor Aleátorio](https://github.com/user-attachments/assets/a292c1e6-e465-46e4-bdbc-167afe2ad8f6)



## 💡 Conclusão

• Qual o método de ordenação estudado mais eficiente? 

• O tipo de vetor (ordenado de forma crescente, decrescente e aleatório) influencia
na performance dos algoritmos? 

• Os gráficos obtidos expressaram a notação Big O definida? Por que?
