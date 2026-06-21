# Portfolio-agent (Cloudflare Worker)

Säker backend för chat-agenten på portfoliosidan. Proxar till Claude API med
streaming (SSE), function calling och prompt-cachning. API-nyckeln lever bara
här som secret — aldrig i frontend.

## Köra lokalt

```sh
cd worker
npm install
npx wrangler login                          # första gången
npx wrangler secret put ANTHROPIC_API_KEY   # klistra in nyckeln när den frågar
npm run dev                                 # startar på http://localhost:8787
```

Kör sedan `npm run dev` i projektroten som vanligt — Vite proxar `/api/*`
till workern (se `vite.config.js`).

## Deploy

```sh
npm run deploy
```

Avkommentera `routes` i `wrangler.jsonc` när domänen är kopplad, så svarar
workern på `emundliljestrand.com/api/*` (same-origin med sidan = ingen CORS).

## Kostnadsskydd

- `MAX_TOKENS_OUT` + storleksvalidering bundar varje anrop
- Rate limiting per IP (10 req/min, best effort per isolate)
- Sätt dessutom en hård budgetgräns på API-kontot i Anthropic Console
  (Settings → Limits) — det är den riktiga spärren.

## Filer

- `src/index.js` — endpoint, validering, rate limiting, SSE-streaming
- `src/facts.js` — kurerad faktabas; agentens enda sanningskälla om Emund.
  Uppdatera den här filen när fakta ändras (t.ex. ny mejladress).
