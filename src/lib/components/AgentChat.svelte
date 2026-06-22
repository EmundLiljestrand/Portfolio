<script>
  import { onMount } from 'svelte'

  let available = $state(false)
  let open = $state(false)
  let busy = $state(false)
  let draft = $state('')
  let messages = $state([]) // { role: 'user' | 'assistant' | 'system', text }

  let history = [] // Claude API-format — klienten äger loopen
  let listEl = $state()

  onMount(async () => {
    try {
      const res = await fetch('/api/health')
      available = res.ok
    } catch {
      available = false
    }
  })

  function scrollChatToBottom() {
    requestAnimationFrame(() => {
      if (listEl) listEl.scrollTop = listEl.scrollHeight
    })
  }

  const PROJECT_IDS = { chatbot: 'project-chatbot', agent: 'project-agent' }
  const PROJECT_NAMES = { chatbot: 'AI Coach Chatbot', agent: 'AI Coach Agent' }
  const SKILL_NAMES = {
    languages: 'Språk & ramverk',
    ai: 'AI & Data',
    infra: 'Infrastruktur & drift',
    databases: 'Databaser',
  }

  function toolFlavor(name, input) {
    if (name === 'scroll_to_section') {
      const map = {
        hero: 'startskärmen',
        projects: 'Quest Log',
        about: 'karaktärsbladet',
        contact: 'kontaktrutan',
      }
      return `▸ Bläddrar till ${map[input?.section] ?? input?.section}...`
    }
    if (name === 'highlight_project') {
      return `▸ Pekar ut ${PROJECT_NAMES[input?.project] ?? input?.project}...`
    }
    if (name === 'show_skills') {
      return `▸ Öppnar ${SKILL_NAMES[input?.category] ?? input?.category} i ryggsäcken...`
    }
    return '▸ Letar i ryggsäcken...'
  }

  function runTool(name, input) {
    if (name === 'scroll_to_section') {
      const el = document.getElementById(input?.section)
      if (el) {
        window.dispatchEvent(new CustomEvent('agent:scroll-to', { detail: input.section }))
        return `Scrollade till ${input.section}.`
      }
      return 'Sektionen hittades inte.'
    }
    if (name === 'highlight_project') {
      const id = PROJECT_IDS[input?.project]
      if (id && document.getElementById(id)) {
        window.dispatchEvent(new CustomEvent('agent:highlight', { detail: id }))
        return `Markerade projektet ${input.project}.`
      }
      return 'Projektet hittades inte.'
    }
    if (name === 'show_skills') {
      const id = `skill-${input?.category}`
      if (document.getElementById(id)) {
        window.dispatchEvent(new CustomEvent('agent:highlight', { detail: id }))
        return `Lyfte fram kompetensgruppen ${input.category}.`
      }
      return 'Kompetensgruppen hittades inte.'
    }
    return `Okänt verktyg: ${name}`
  }

  async function streamTurn() {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ messages: history }),
    })
    if (!res.ok) {
      const err = await res.json().catch(() => null)
      throw new Error(err?.error ?? 'Följeslagaren svarar inte just nu.')
    }

    messages.push({ role: 'assistant', text: '' })
    const bubble = messages[messages.length - 1]

    const reader = res.body.getReader()
    const decoder = new TextDecoder()
    let buffer = ''
    let done = null

    while (true) {
      const { value, done: eof } = await reader.read()
      if (eof) break
      buffer += decoder.decode(value, { stream: true })

      const frames = buffer.split('\n\n')
      buffer = frames.pop() ?? ''

      for (const frame of frames) {
        let event = 'message'
        let data = ''
        for (const line of frame.split('\n')) {
          if (line.startsWith('event: ')) event = line.slice(7)
          else if (line.startsWith('data: ')) data += line.slice(6)
        }
        if (!data) continue
        const payload = JSON.parse(data)

        if (event === 'text') {
          bubble.text += payload.text
          scrollChatToBottom()
        } else if (event === 'done') {
          done = payload
        } else if (event === 'error') {
          throw new Error(payload.message)
        }
      }
    }

    if (!done) throw new Error('Förbindelsen bröts.')

    // Tomt assistant-svar (rent tool-svar) → ta bort den tomma bubblan
    if (!bubble.text) messages = messages.filter((m) => m !== bubble)

    history.push({ role: 'assistant', content: done.content })

    if (done.stop_reason === 'tool_use') {
      const results = []
      for (const b of done.content) {
        if (b.type !== 'tool_use') continue
        messages.push({ role: 'system', text: toolFlavor(b.name, b.input) })
        scrollChatToBottom()
        results.push({
          type: 'tool_result',
          tool_use_id: b.id,
          content: runTool(b.name, b.input),
        })
      }
      history.push({ role: 'user', content: results })
    }

    return done.stop_reason
  }

  // Workern tar max 24 meddelanden. Håll klientens historik under det med
  // marginal för en rundas tool-utbyten, annars låser sig chatten efter en
  // handfull frågor. Fönstret måste börja på en riktig användarfråga, aldrig
  // mitt i ett tool_use/tool_result-par (det ger API-fel).
  const MAX_HISTORY = 16
  function trimHistory() {
    if (history.length <= MAX_HISTORY) return
    history = history.slice(-MAX_HISTORY)
    while (history.length && !(history[0].role === 'user' && typeof history[0].content === 'string')) {
      history.shift()
    }
  }

  async function send() {
    const text = draft.trim()
    if (!text || busy) return
    draft = ''
    busy = true

    trimHistory()
    messages.push({ role: 'user', text })
    history.push({ role: 'user', content: text })
    scrollChatToBottom()

    try {
      for (let i = 0; i < 3; i++) {
        const stop = await streamTurn()
        if (stop !== 'tool_use') break
      }
    } catch (err) {
      messages.push({
        role: 'system',
        text: `${err.message} Maila gärna istället, se kontaktrutan.`,
      })
    } finally {
      busy = false
      scrollChatToBottom()
    }
  }

  function onKeydown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  // Startfrågor i tomma rutan: tar bort "blank ruta"-tröskeln och guidar besökaren
  const starters = [
    'Vad har Emund byggt?',
    'Vilka kompetenser har han?',
    'Berätta om hans bakgrund',
    'Hur når jag honom?',
  ]
  function ask(q) {
    if (busy) return
    draft = q
    send()
  }
</script>

{#snippet sprite()}
  <svg class="sprite" viewBox="0 0 12 12" aria-hidden="true">
    <rect x="3" y="1" width="6" height="2" fill="#8bd94e" />
    <rect x="2" y="3" width="8" height="6" fill="#6a8a4e" />
    <rect x="3" y="3" width="6" height="4" fill="#f2ecd8" />
    <rect x="4" y="4" width="1" height="2" fill="#16291b" />
    <rect x="7" y="4" width="1" height="2" fill="#16291b" />
    <rect x="2" y="9" width="8" height="3" fill="#8bd94e" />
  </svg>
{/snippet}

{#if available}
  <div class="agent">
    {#if open}
      <section class="panel frame" aria-label="Dialog med Emunds följeslagare">
        <header class="panel-head">
          <span class="title">
            {@render sprite()}
            <span class="pixel">Följeslagaren</span>
            <span class="online"></span>
          </span>
          <button class="close pixel" onclick={() => (open = false)} aria-label="Stäng">✕</button>
        </header>

        <div class="list" bind:this={listEl} data-lenis-prevent>
          {#if messages.length === 0}
            <p class="intro">
              Välkommen, vandrare. Jag är en följeslagare som Emund byggt. Fråga
              mig om hans quests (projekt), hans bakgrund eller kompetenser, så
              visar jag dig runt i äventyret.
            </p>
            <div class="starters">
              {#each starters as s}
                <button type="button" class="starter" onclick={() => ask(s)}>{s}</button>
              {/each}
            </div>
          {/if}
          {#each messages as m}
            {#if m.role === 'system'}
              <div class="log">{m.text}</div>
            {:else}
              <div class="msg {m.role}">{m.text}</div>
            {/if}
          {/each}
          {#if busy && messages[messages.length - 1]?.text === ''}
            <div class="log">▸ tänker<span class="blink">_</span></div>
          {/if}
        </div>

        <form
          class="composer"
          onsubmit={(e) => {
            e.preventDefault()
            send()
          }}
        >
          <textarea
            rows="1"
            placeholder="Skriv ditt svar…"
            bind:value={draft}
            onkeydown={onKeydown}
            disabled={busy}
          ></textarea>
          <button type="submit" class="pixel" disabled={busy || !draft.trim()}>OK</button>
        </form>
        <p class="disclaimer">AI-svar · dela inga personuppgifter här</p>
      </section>
    {:else}
      <button class="fab pixel" onclick={() => (open = true)} aria-label="Öppna dialogen">
        {@render sprite()}
        Fråga följeslagaren
      </button>
    {/if}
  </div>
{/if}

<style>
  .agent {
    position: fixed;
    bottom: var(--space-6);
    right: var(--space-6);
    z-index: 200;
  }

  .sprite {
    width: 22px;
    height: 22px;
    image-rendering: pixelated;
    flex-shrink: 0;
  }

  .fab {
    display: inline-flex;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-3) var(--space-4);
    border: 3px solid var(--gold-dim);
    background: var(--gold);
    color: #20180a;
    font-size: var(--text-xs);
    text-transform: uppercase;
    cursor: pointer;
    box-shadow: 4px 4px 0 var(--bg-sunken);
    transition: transform 0.1s steps(2), box-shadow 0.1s;
  }
  .fab:hover {
    transform: translate(-2px, -2px);
    box-shadow: 6px 6px 0 var(--bg-sunken);
  }

  .panel {
    display: flex;
    flex-direction: column;
    width: min(380px, calc(100vw - 2 * var(--space-6)));
    height: min(520px, 70vh);
    box-shadow: 6px 6px 0 var(--bg-sunken);
  }

  .panel-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--space-3) var(--space-4);
    border-bottom: 2px solid var(--border-strong);
    background: var(--bg-sunken);
  }
  .title {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    font-size: var(--text-xs);
    text-transform: uppercase;
    color: var(--green);
  }
  .online {
    width: 8px;
    height: 8px;
    background: var(--green);
    box-shadow: 0 0 0 2px var(--bg-sunken);
  }
  .close {
    background: none;
    border: none;
    color: var(--muted);
    cursor: pointer;
    font-size: var(--text-xs);
  }
  .close:hover {
    color: var(--clay);
  }

  .list {
    flex: 1;
    overflow-y: auto;
    overscroll-behavior: contain; /* scrollen ska inte "läcka" ut i sidan vid kanterna */
    padding: var(--space-4);
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    font-family: var(--font-ui);
    font-size: var(--text-lg);
    line-height: 1.4;
  }

  .intro {
    color: var(--muted);
  }

  .starters {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    margin-top: var(--space-3);
  }
  .starter {
    text-align: left;
    font-family: var(--font-ui);
    font-size: var(--text-base);
    letter-spacing: 0.02em;
    color: var(--text);
    background: var(--bg-sunken);
    border: 2px solid var(--border-strong);
    padding: var(--space-2) var(--space-3);
    cursor: pointer;
    transition: border-color 0.1s, color 0.1s;
  }
  .starter::before {
    content: '▸ ';
    color: var(--gold);
  }
  .starter:hover {
    border-color: var(--gold);
    color: var(--gold);
  }

  .msg {
    max-width: 88%;
    padding: var(--space-2) var(--space-3);
    border: 2px solid;
    white-space: pre-wrap;
    overflow-wrap: break-word;
  }
  .msg.user {
    align-self: flex-end;
    border-color: var(--gold-dim);
    background: color-mix(in srgb, var(--gold) 16%, transparent);
    color: var(--text);
  }
  .msg.assistant {
    align-self: flex-start;
    border-color: var(--border-strong);
    background: var(--bg-sunken);
    color: var(--text);
  }

  .log {
    color: var(--gold);
    font-size: var(--text-base);
    letter-spacing: 0.03em;
  }
  .blink {
    animation: blink 1s steps(1) infinite;
  }
  @keyframes blink {
    0%, 50% { opacity: 1; }
    50.01%, 100% { opacity: 0; }
  }

  .composer {
    display: flex;
    gap: var(--space-2);
    padding: var(--space-3) var(--space-4) var(--space-2);
    border-top: 2px solid var(--border-strong);
  }
  textarea {
    flex: 1;
    resize: none;
    background: var(--bg-sunken);
    border: 2px solid var(--border-strong);
    color: var(--text);
    font-family: var(--font-ui);
    font-size: var(--text-lg);
    padding: var(--space-2) var(--space-3);
  }
  textarea:focus-visible {
    outline: none;
    border-color: var(--green);
  }
  .composer button {
    background: var(--green);
    color: #11260f;
    border: 2px solid var(--border-strong);
    padding: var(--space-2) var(--space-4);
    font-size: var(--text-xs);
    cursor: pointer;
  }
  .composer button:disabled {
    opacity: 0.4;
    cursor: default;
  }

  .disclaimer {
    font-family: var(--font-ui);
    font-size: var(--text-sm);
    color: var(--muted);
    text-align: center;
    padding: 0 var(--space-4) var(--space-3);
  }

  @media (max-width: 480px) {
    .agent {
      bottom: var(--space-4);
      right: var(--space-4);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .fab:hover { transform: none; }
    .blink { animation: none; }
  }
</style>
