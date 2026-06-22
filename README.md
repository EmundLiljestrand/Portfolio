# Portfolio: Emund Liljestrand

My personal portfolio, built as a small pixel/RPG-themed world. The part I'm most
proud of isn't a section though, it's the **AI companion**: an agent that answers
questions about me from a curated knowledge base and uses function calling to
navigate the page while it talks.

Live: [emundliljestrand.com](https://emundliljestrand.com)

## Stack

- Svelte 5 (runes) + Vite
- GSAP (ScrollTrigger) and Lenis for the scroll animations, all behind a
  `prefers-reduced-motion` check
- A Cloudflare Worker talking to the Claude API for the agent

## The AI companion

This is the interesting part. It's a streaming, tool-using agent, and the twist is
that **the client owns the agent loop**. The Worker stays stateless and just relays
one model turn at a time:

```
User question
  → Worker: POST /api/chat (validates, rate-limits)
  → Claude (SSE stream): text + optional tool_use
  → Client renders text live, runs the tool, posts the tool_result back
  → repeat until the model stops asking for tools
```

A few things I made deliberate choices about:

The tools act on the page (scroll to a section, highlight a project, surface a
skill group), so it made sense to run them in the browser rather than the server.
That's why the loop lives client-side; the Worker never has to know anything about
the DOM.

The agent's only source of truth about me is a hand-written `facts.js`. The system
prompt tells it not to invent anything and to point people to the contact section
when it doesn't know something, so it stays grounded instead of guessing.

On the safety and cost side: there's prompt-injection handling in the system
prompt, per-IP rate limiting, input and output size caps, and a reminder in the UI
not to paste personal data. The static part of the prompt (instructions + facts)
is sent with prompt caching so repeat calls stay cheap, and the client trims the
history to a sliding window so a long chat can't grow without bound. The rate
limiter is best-effort (it lives in memory per Worker isolate), which is fine for a
portfolio; the real safety net is a hard spend cap on the API account.

## Running locally

The chat needs both the frontend and the Worker running. In dev, Vite proxies
`/api` to the Worker on `localhost:8787`.

Worker (backend):

```bash
cd worker
npm install
# put your key in worker/.dev.vars (gitignored):
#   ANTHROPIC_API_KEY=sk-ant-...
npm run dev
```

Site (frontend), from the repo root:

```bash
npm install
npm run dev
```

Then open the Vite URL. The companion button only shows up once the Worker answers
its health check, so the rest of the site works fine without it.

## Project layout

```
src/lib/sections     Hero, Projects, About, Contact
src/lib/components    CaseStudy, AgentChat (the companion UI)
worker/src/index.js   request handling, SSE streaming, tool definitions
worker/src/facts.js   the agent's grounding, its only source about me
```

## Deployment

The site is a static build on Cloudflare Pages. The Worker is deployed separately
and routed at `/api/*` on the same domain so the frontend's relative calls reach
it. The API key goes in with `wrangler secret put`, never into the repo.
