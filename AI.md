# Registro de Interações com IA — TerraVis (GS Web Dev)

Ferramenta utilizada: Claude Code (claude-sonnet-4-6) via VSCode Extension  
Data: 02/06/2026

---


## Interação 1

### O que foi solicitado para a IA

Analisar e modificar o projeto web existente seguindo os seguintes requisitos funcionais:
- Implementar um slideshow com exatamente 3 imagens relacionadas ao tema do projeto
- O slideshow deve possuir navegação (botões ou automático)
- Utilizar apenas JavaScript puro (moderno), HTML e CSS — sem frameworks ou bibliotecas externas

### O que a IA retornou

A IA analisou os arquivos existentes (`index.html`, `css/style.css`, `js/script.js`) e implementou:

**`index.html`** — adicionou uma nova seção `#slideshow` entre as seções `#sobre` e `#estatisticas`, contendo:
- Estrutura de 3 slides com classes `slide-ndvi`, `slide-fire` e `slide-flood`
- Cada slide com ícone Boxicons (já presente no projeto), título e texto descritivo temático
- Botões de navegação `‹` (anterior) e `›` (próximo) com `aria-label` para acessibilidade
- Dots de navegação direta com atributo `data-index`

**`css/style.css`** — adicionou bloco de estilos para o slideshow:
- `.slideshow`, `.slides-wrapper`, `.slide` com transição de opacidade (`opacity 0.7s ease`) e `position: absolute`
- Gradientes CSS para cada slide representando o tema: verde escuro→verde (NDVI), vermelho→laranja (Queimadas), azul marinho→azul (Enchentes)
- Estilo dos botões `.slide-btn`, `.slide-prev`, `.slide-next`
- Estilo dos dots `.dot` e `.dot.active`
- Responsividade adicionada no `@media (max-width: 768px)` já existente

**`js/script.js`** — implementou a lógica do slideshow:
- Seleção de `slides` e `dots` via `querySelectorAll`
- Função `goTo(index)` para troca de slide com controle circular (`% slides.length`)
- Função `startAuto()` com `setInterval` de 4000ms
- Função `resetAuto()` para reiniciar o timer ao interagir manualmente
- Event listeners nos botões anterior/próximo e nos dots

Os 3 slides temáticos entregues foram:

- **Slide 1 — Saúde da Lavoura via NDVI:** monitoramento de vegetação com dados do Sentinel-2 (ESA); fundo em gradiente verde escuro ao verde claro.
- **Slide 2 — Alertas de Queimadas em Tempo Real:** detecção de focos de calor com NASA FIRMS, atualização a cada 3h; fundo em gradiente vermelho ao laranja.
- **Slide 3 — Detecção de Enchentes por Radar SAR:** mapeamento de alagamentos com Sentinel-1 SAR, que atravessa nuvens e chuva; fundo em gradiente azul marinho ao azul claro.

### O que foi alterado ou rejeitado

**Aceito integralmente:**
- Toda a estrutura HTML do slideshow
- Todo o CSS gerado
- Todo o JavaScript gerado

**Decisão de design tomada pela IA (sem rejeição):**
- Como o projeto não possui imagens além do `hero-bg.jpg`, a IA optou por usar gradientes CSS como representação visual dos slides em vez de imagens rasterizadas externas. Essa abordagem mantém o projeto autocontido e sem dependências externas, respeitando a restrição do enunciado.

## Interação 2

### O que foi solicitado para a IA

Criar um formulário "Solicite uma Demo" para a landing page TerraVis, atendendo aos seguintes requisitos:
- Campos obrigatórios: nome completo, empresa/fazenda, e-mail e telefone
- Grupo de checkboxes indicando qual funcionalidade mais interessa (NDVI, Queimadas, Enchentes, Janela de Plantio)
- Validação que impeça o envio com qualquer campo vazio ou sem nenhum checkbox marcado
- Feedback visual claro ao usuário em caso de erro — sem uso de `alert()`
- Apenas JavaScript puro (moderno), HTML e CSS — sem frameworks ou bibliotecas externas

### O que a IA retornou

A IA leu os arquivos existentes (`index.html`, `css/style.css`, `js/script.js`) para entender a estrutura e a identidade visual do projeto antes de escrever qualquer código, e então implementou:

**`index.html`** — adicionou:
- Link "Demo" na navbar apontando para `#demo`
- Nova seção `#demo` com fundo claro (`bg-light`), título padrão da página e parágrafo descritivo
- Formulário `#demo-form` com `novalidate` (desativa validação nativa do browser) contendo:
  - 4 campos de texto (`text`, `email`, `tel`) cada um seguido de um `<span class="form-error">` para exibição de mensagem de erro
  - Grupo de 4 checkboxes estilizados como cards (`input[name="funcionalidade"]`), com `id="checkbox-group"` para controle de estado de erro
  - Botão de envio `<button type="submit">`
- Div `#demo-success` com atributo `hidden`, exibida no lugar do formulário após envio válido

**`css/style.css`** — adicionou bloco de estilos para o formulário:
- `.demo-form` com layout em coluna (`flex-direction: column`) e `max-width: 640px` centralizado
- Inputs com borda de 2px cinza, transição para verde (`--primary-color`) no foco e para vermelho no estado `.input-error`
- `.checkbox-label` estilizados como cards com borda, hover verde e `accent-color` verde no checkbox nativo
- `.checkbox-group.group-error` aplica borda vermelha em todos os cards quando nenhum está marcado
- `.form-error` em vermelho com altura mínima reservada para evitar saltos de layout
- `.demo-success` com ícone grande centralizado, título e texto de confirmação
- Responsividade: checkboxes passam de 2 colunas para 1 coluna abaixo de 768px; botão ocupa largura total

**`js/script.js`** — adicionou lógica de validação ao final do arquivo existente:
- Funções `setError(fieldId, errorId, message)` e `clearError(fieldId, errorId)` para adicionar/remover a classe `.input-error` e preencher/limpar o `<span>` de erro correspondente
- Função `isValidEmail(value)` com regex para verificar formato do e-mail além de verificar se não está vazio
- Listener no evento `submit` que: limpa todos os erros anteriores; valida cada campo individualmente; verifica se ao menos um checkbox está marcado; só exibe a tela de sucesso (`demoSuccess.hidden = false` + `demoForm.hidden = true`) se `valid === true`
- Listeners de `input` em cada campo de texto e `change` em cada checkbox para limpar o erro do campo assim que o usuário começa a corrigir — sem necessidade de re-submeter

### O que foi alterado ou rejeitado

**Aceito integralmente:**
- Toda a estrutura HTML do formulário e da tela de sucesso
- Todo o CSS gerado
- Todo o JavaScript de validação

**Decisões tomadas pela IA:**
- Uso de `novalidate` no `<form>` para desabilitar os popups padrão do browser e assumir controle total sobre o feedback visual via JavaScript
- Validação de formato de e-mail por regex além da verificação de campo vazio, tornando a validação mais robusta sem depender do `type="email"` do HTML
- Erros limpos campo a campo no evento `input`/`change`, e não apenas no próximo `submit`, para melhor experiência do usuário

---

## Interação 3

### O que foi solicitado para a IA

Criar uma página de quiz completa (`quiz.html`) contendo exatamente 10 perguntas sobre o tema do projeto TerraVis, com os seguintes requisitos:
- Perguntas exibidas dinamicamente via JavaScript (não fixas no HTML)
- Array de perguntas no JavaScript
- Uma pergunta exibida por vez
- Apenas uma resposta selecionável por pergunta
- Resultado final com pontuação e mensagem de desempenho
- Código organizado em funções (sem código solto)
- Interface simples seguindo a identidade visual do projeto
- Botão de reiniciar o quiz
- Apenas JavaScript puro (moderno), HTML e CSS — sem frameworks ou bibliotecas externas
- As 10 perguntas e alternativas foram fornecidas textualmente pelo usuário, com as respostas corretas indicadas com (✓)

### O que a IA retornou

Três novos arquivos criados:

**`quiz.html`** (na raiz do projeto):
- Header com logo clicável que retorna ao `index.html` e tag "Quiz de Conhecimentos"
- `#quiz-screen`: contador de pergunta atual, barra de progresso animada, texto da pergunta, lista de opções gerada pelo JS e botão "Próxima →" (desabilitado até o usuário selecionar)
- `#result-screen` (oculto com atributo `hidden`): ícone de troféu, pontuação no formato "X / 10", mensagem de desempenho e botão "Reiniciar Quiz"

**`css/quiz.css`**:
- Mesma paleta do site principal (`--primary-color: #2ecc71`, `--secondary-color: #051c11`, fontes Inter e Montserrat)
- `.option-btn` como cards clicáveis; após seleção: `.correct` (borda e círculo verde) e `.wrong` (borda e círculo vermelho) — a resposta correta sempre fica verde mesmo que o usuário erre
- Barra de progresso com `transition: width 0.45s ease` atualizada a cada pergunta
- Botão desabilitado com `opacity: 0.3` enquanto nenhuma opção foi escolhida
- Responsivo: padding reduzido e tag do header oculta abaixo de 600px

**`js/quiz.js`**:
- Array `questions` com os 10 objetos `{ text, options[], correct }`, sendo `correct` o índice (0–3) da alternativa correta
- Fluxo de funções: `init()` → `renderQuestion()` → `selectOption()` → `nextQuestion()` → `showResult()` → `restart()` — nenhum código fora de função
- `getResultMessage(points)` com 4 faixas: ≤3, ≤6, ≤9 e 10 acertos
- O texto do botão muda automaticamente para "Ver resultado" na última pergunta

Gabarito implementado (índices das respostas corretas):
- Perguntas 1 a 7: `correct: 2` (alternativa C)
- Perguntas 8 e 9: `correct: 3` (alternativa D)
- Pergunta 10: `correct: 1` (alternativa B)

### O que foi alterado ou rejeitado

**Aceito integralmente:**
- Toda a estrutura HTML, CSS e JavaScript do quiz

**Decisões tomadas pela IA:**
- Após o usuário selecionar uma opção, o feedback correto/errado é exibido imediatamente (antes de clicar em "Próxima"), tornando a experiência mais educativa sem violar nenhum requisito
- O botão muda seu próprio texto conforme o contexto ("Próxima →" vs "Ver resultado"), evitando a necessidade de um botão separado para a última pergunta

---

## Interação 4

### O que foi solicitado para a IA

Adicionar uma forma de acessar o quiz (`quiz.html`) diretamente pela página principal do projeto, pois a ligação entre as duas páginas havia sido esquecida.

### O que a IA retornou

Duas adições no `index.html` e os respectivos estilos no `css/style.css`:

**`index.html`**:
- Link "Quiz" adicionado ao final da navbar com a classe `.nav-quiz`
- Nova seção `.quiz-cta` antes do `</main>`, contendo ícone, título "Teste seus conhecimentos", texto descritivo e botão "Fazer o Quiz" linkando para `quiz.html`

**`css/style.css`**:
- `.nav-quiz`: destaque visual na navbar com fundo verde (`--primary-color`), texto escuro e bordas arredondadas — diferenciando o link de quiz dos demais itens de âncora
- `.quiz-cta`: banner de fundo escuro (`--secondary-color`) com borda superior verde, layout flex com ícone, bloco de texto e botão lado a lado
- Responsividade: abaixo de 600px o banner vira coluna centralizada

### O que foi alterado ou rejeitado

**Aceito integralmente:**
- Navbar e seção CTA

---







