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







