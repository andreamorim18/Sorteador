# 🎲 Sorteador de Números

Um site responsivo para sorteio de números aleatórios, desenvolvido como desafio da Rocketseat.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## 📸 Preview

![Preview do Sorteador](https://via.placeholder.com/800x400/0A0A0F/8B5CF6?text=Sorteador+de+Números)

## 📋 Sobre o Projeto

O **Sorteador de Números** é uma aplicação web que permite ao usuário:

- ✅ Definir a **quantidade** de números a serem sorteados
- ✅ Configurar o **intervalo** (valor mínimo e máximo)
- ✅ Optar por **não repetir** números no sorteio
- ✅ Visualizar os resultados com **animações** atrativas
- ✅ Receber **feedback visual** de erros e sucesso

## 🚀 Como Rodar o Projeto

### Opção 1: Abrir diretamente no navegador

1. Faça o download ou clone este repositório
2. Abra o arquivo `index.html` no seu navegador favorito

```bash
# Clonar o repositório
git clone https://github.com/seu-usuario/sorteador-numeros.git

# Entrar na pasta
cd sorteador-numeros

# Abrir no navegador (Linux)
xdg-open index.html

# Abrir no navegador (Mac)
open index.html

# Abrir no navegador (Windows)
start index.html
```

### Opção 2: Usando Live Server (VS Code)

1. Instale a extensão **Live Server** no VS Code
2. Clique com botão direito no `index.html`
3. Selecione **"Open with Live Server"**

### Opção 3: Usando servidor local

**Com Python:**
```bash
# Python 3
python -m http.server 8000

# Acesse: http://localhost:8000
```

**Com Node.js:**
```bash
npx http-server

# Acesse: http://localhost:8080
```

## 📁 Estrutura do Projeto

```
sorteador-numeros/
│
├── index.html          # Estrutura HTML da página
│
├── css/
│   └── style.css       # Estilos, variáveis e responsividade
│
├── js/
│   └── script.js       # Lógica do sorteio e validações
│
└── README.md           # Documentação do projeto
```

## ✨ Funcionalidades

### 📝 Formulário
- Campo para quantidade de números
- Campos para valor mínimo e máximo
- Checkbox para não repetir números
- Botão de sortear com efeito hover

### ✅ Validações
- Campos obrigatórios não podem estar vazios
- Valor máximo deve ser maior que o mínimo
- Quantidade não pode exceder o intervalo disponível (quando "Não repetir" está ativo)
- Mensagens de erro claras e amigáveis

### 🎨 Interface
- Design moderno com tema escuro
- Efeitos de glassmorphism
- Gradientes animados no fundo
- Layout em duas colunas (desktop)
- 100% responsivo (desktop, tablet e mobile)

### ♿ Acessibilidade
- Labels associados aos inputs
- Atributos aria-live para mensagens
- Suporte a navegação por teclado
- Respeita preferência de movimento reduzido

### 🎬 Animações
- Números aparecem com efeito pop-in
- Cores alternadas nas bolas
- Loading animado no botão
- Transições suaves em hover/focus

## 🔧 Tecnologias Utilizadas

| Tecnologia | Descrição |
|------------|-----------|
| **HTML5** | Estrutura semântica da página |
| **CSS3** | Estilização com variáveis, flexbox, grid e animações |
| **JavaScript** | Manipulação do DOM, validações e lógica de sorteio |
| **Google Fonts** | Fontes Outfit e Space Mono |

## 📱 Responsividade

O projeto se adapta a diferentes tamanhos de tela:

| Dispositivo | Breakpoint |
|-------------|------------|
| Desktop | > 900px |
| Tablet | 600px - 900px |
| Mobile | < 600px |
| Mobile pequeno | < 380px |

## 🎨 Personalização

Para personalizar as cores, edite as variáveis CSS no arquivo `css/style.css`:

```css
:root {
  /* Cores principais */
  --primary-500: #8B5CF6;
  --primary-400: #A78BFA;
  --primary-600: #7C3AED;
  
  /* Cores de destaque */
  --accent-cyan: #22D3EE;
  --accent-pink: #F472B6;
  --accent-orange: #FB923C;
  
  /* Cores de fundo */
  --bg-primary: #0A0A0F;
  --bg-card: rgba(18, 18, 24, 0.8);
  
  /* ... outras variáveis */
}
```

## 🧠 Lógica do Sorteio

### Com Repetição
```javascript
function sortearComRepeticao(quantidade, min, max) {
  const numeros = [];
  for (let i = 0; i < quantidade; i++) {
    const numero = Math.floor(Math.random() * (max - min + 1)) + min;
    numeros.push(numero);
  }
  return numeros;
}
```

### Sem Repetição
```javascript
function sortearSemRepeticao(quantidade, min, max) {
  const numeros = new Set();
  while (numeros.size < quantidade) {
    const numero = Math.floor(Math.random() * (max - min + 1)) + min;
    numeros.add(numero);
  }
  return Array.from(numeros);
}
```

## 📚 Aprendizados

Durante o desenvolvimento deste projeto, pratiquei:

- Manipulação do DOM com JavaScript puro
- Validação de formulários
- CSS moderno (variáveis, flexbox, grid)
- Animações e transições CSS
- Design responsivo
- Acessibilidade web
- Boas práticas de código

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer um fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abrir um Pull Request

## 👨‍💻 Autor

Desenvolvido por **André** como parte do desafio Rocketseat.

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Darkazerazs)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/seu-perfil)
[![YouTube](https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://youtube.com/@Darkazerazs)

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

<p align="center">
  Feito com 💜 para a comunidade Rocketseat
</p>
