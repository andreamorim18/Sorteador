// ============================================
// ELEMENTOS DO DOM
// ============================================
const form = document.getElementById('sortear-form');
const quantidadeInput = document.getElementById('quantidade');
const minimoInput = document.getElementById('minimo');
const maximoInput = document.getElementById('maximo');
const naoRepetirCheckbox = document.getElementById('nao-repetir');
const btnSortear = document.getElementById('btn-sortear');
const messageArea = document.getElementById('message-area');
const resultsArea = document.getElementById('results-area');
const numbersContainer = document.getElementById('numbers-container');

// Elementos de erro
const quantidadeError = document.getElementById('quantidade-error');
const minimoError = document.getElementById('minimo-error');
const maximoError = document.getElementById('maximo-error');

// ============================================
// FUNÇÕES DE VALIDAÇÃO
// ============================================

/**
 * Remove classe de erro e mensagem de um campo
 */
function clearFieldError(input, errorElement) {
  input.classList.remove('error');
  errorElement.textContent = '';
  errorElement.classList.remove('visible');
}

/**
 * Adiciona classe de erro e mensagem a um campo
 */
function setFieldError(input, errorElement, message) {
  input.classList.add('error');
  errorElement.textContent = message;
  errorElement.classList.add('visible');
}

/**
 * Limpa todos os erros do formulário
 */
function clearAllErrors() {
  clearFieldError(quantidadeInput, quantidadeError);
  clearFieldError(minimoInput, minimoError);
  clearFieldError(maximoInput, maximoError);
  hideMessage();
}

/**
 * Valida se um campo está vazio
 */
function isFieldEmpty(value) {
  return value === '' || value === null || value === undefined;
}

/**
 * Valida todos os campos do formulário
 * Retorna objeto com status de validação e valores
 */
function validateForm() {
  let isValid = true;
  clearAllErrors();
  
  // Obter valores
  const quantidade = quantidadeInput.value.trim();
  const minimo = minimoInput.value.trim();
  const maximo = maximoInput.value.trim();
  const naoRepetir = naoRepetirCheckbox.checked;
  
  // Validar campo quantidade
  if (isFieldEmpty(quantidade)) {
    setFieldError(quantidadeInput, quantidadeError, 'Informe a quantidade de números');
    isValid = false;
  } else if (parseInt(quantidade) < 1) {
    setFieldError(quantidadeInput, quantidadeError, 'A quantidade deve ser pelo menos 1');
    isValid = false;
  }
  
  // Validar campo mínimo
  if (isFieldEmpty(minimo)) {
    setFieldError(minimoInput, minimoError, 'Informe o valor mínimo');
    isValid = false;
  }
  
  // Validar campo máximo
  if (isFieldEmpty(maximo)) {
    setFieldError(maximoInput, maximoError, 'Informe o valor máximo');
    isValid = false;
  }
  
  // Se os campos básicos estão preenchidos, validar lógica
  if (!isFieldEmpty(minimo) && !isFieldEmpty(maximo)) {
    const minValue = parseInt(minimo);
    const maxValue = parseInt(maximo);
    
    // Validar se máximo é maior que mínimo
    if (maxValue <= minValue) {
      setFieldError(maximoInput, maximoError, 'O valor máximo deve ser maior que o mínimo');
      isValid = false;
    } else if (!isFieldEmpty(quantidade) && naoRepetir) {
      // Validar quantidade vs intervalo (apenas se não repetir estiver marcado)
      const qtd = parseInt(quantidade);
      const intervalo = maxValue - minValue + 1;
      
      if (qtd > intervalo) {
        setFieldError(
          quantidadeInput, 
          quantidadeError, 
          `Com "Não repetir" ativado, máximo é ${intervalo} números neste intervalo`
        );
        isValid = false;
      }
    }
  }
  
  return {
    isValid,
    values: {
      quantidade: parseInt(quantidade),
      minimo: parseInt(minimo),
      maximo: parseInt(maximo),
      naoRepetir
    }
  };
}

// ============================================
// FUNÇÕES DE SORTEIO
// ============================================

/**
 * Sorteia números COM repetição
 * @param {number} quantidade - Quantidade de números a sortear
 * @param {number} min - Valor mínimo
 * @param {number} max - Valor máximo
 * @returns {number[]} Array com os números sorteados
 */
function sortearComRepeticao(quantidade, min, max) {
  const numeros = [];
  
  for (let i = 0; i < quantidade; i++) {
    // Math.random() retorna valor entre 0 (inclusive) e 1 (exclusive)
    // Multiplicamos pelo intervalo e somamos o mínimo
    const numero = Math.floor(Math.random() * (max - min + 1)) + min;
    numeros.push(numero);
  }
  
  return numeros;
}

/**
 * Sorteia números SEM repetição
 * @param {number} quantidade - Quantidade de números a sortear
 * @param {number} min - Valor mínimo
 * @param {number} max - Valor máximo
 * @returns {number[]} Array com os números sorteados (únicos)
 */
function sortearSemRepeticao(quantidade, min, max) {
  const numeros = new Set();
  
  // Continua sorteando até ter a quantidade necessária
  while (numeros.size < quantidade) {
    const numero = Math.floor(Math.random() * (max - min + 1)) + min;
    numeros.add(numero); // Set ignora valores duplicados automaticamente
  }
  
  // Converte Set para Array e retorna
  return Array.from(numeros);
}

/**
 * Função principal de sorteio
 * Escolhe entre com ou sem repetição baseado na opção
 */
function realizarSorteio(quantidade, min, max, naoRepetir) {
  if (naoRepetir) {
    return sortearSemRepeticao(quantidade, min, max);
  } else {
    return sortearComRepeticao(quantidade, min, max);
  }
}

// ============================================
// FUNÇÕES DE EXIBIÇÃO
// ============================================

/**
 * Exibe mensagem na área de mensagens
 */
function showMessage(message, type = 'error') {
  messageArea.textContent = message;
  messageArea.className = `message-area visible ${type}`;
}

/**
 * Esconde a área de mensagens
 */
function hideMessage() {
  messageArea.className = 'message-area';
  messageArea.textContent = '';
}

/**
 * Limpa os resultados anteriores
 */
function clearResults() {
  numbersContainer.innerHTML = '';
  resultsArea.classList.remove('visible');
}

/**
 * Exibe os números sorteados com animação
 */
function displayResults(numeros) {
  // Limpa resultados anteriores
  numbersContainer.innerHTML = '';
  
  // Mostra a área de resultados
  resultsArea.classList.add('visible');
  
  // Cria elementos para cada número com delay na animação
  numeros.forEach((numero, index) => {
    const ball = document.createElement('div');
    ball.className = 'number-ball';
    ball.textContent = numero;
    ball.style.animationDelay = `${index * 100}ms`;
    ball.setAttribute('aria-label', `Número sorteado: ${numero}`);
    numbersContainer.appendChild(ball);
  });
}

/**
 * Desabilita o botão durante a animação
 */
function setButtonLoading(loading) {
  if (loading) {
    btnSortear.disabled = true;
    btnSortear.classList.add('loading');
  } else {
    btnSortear.disabled = false;
    btnSortear.classList.remove('loading');
  }
}

// ============================================
// MANIPULADORES DE EVENTOS
// ============================================

/**
 * Handler do submit do formulário
 */
function handleSubmit(event) {
  event.preventDefault();
  
  // Validar formulário
  const validation = validateForm();
  
  if (!validation.isValid) {
    return;
  }
  
  const { quantidade, minimo, maximo, naoRepetir } = validation.values;
  
  // Desabilitar botão e mostrar loading
  setButtonLoading(true);
  clearResults();
  hideMessage();
  
  // Pequeno delay para dar sensação de processamento
  setTimeout(() => {
    // Realizar sorteio
    const numerosSorteados = realizarSorteio(quantidade, minimo, maximo, naoRepetir);
    
    // Exibir resultados
    displayResults(numerosSorteados);
    
    // Mostrar mensagem de sucesso
    const textoRepeticao = naoRepetir ? 'únicos ' : '';
    showMessage(
      `✨ ${quantidade} número${quantidade > 1 ? 's' : ''} ${textoRepeticao}sorteado${quantidade > 1 ? 's' : ''} com sucesso!`,
      'success'
    );
    
    // Calcular tempo total da animação
    const animationTime = (quantidade * 100) + 500;
    
    // Reabilitar botão após a animação
    setTimeout(() => {
      setButtonLoading(false);
    }, animationTime);
    
  }, 300);
}

/**
 * Limpa erro do campo quando o usuário começa a digitar
 */
function handleInputChange(input, errorElement) {
  input.addEventListener('input', () => {
    if (input.classList.contains('error')) {
      clearFieldError(input, errorElement);
    }
  });
}

// ============================================
// INICIALIZAÇÃO
// ============================================

// Adicionar listener do formulário
form.addEventListener('submit', handleSubmit);

// Adicionar listeners para limpar erros ao digitar
handleInputChange(quantidadeInput, quantidadeError);
handleInputChange(minimoInput, minimoError);
handleInputChange(maximoInput, maximoError);

// Foco inicial no primeiro campo
quantidadeInput.focus();
