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







