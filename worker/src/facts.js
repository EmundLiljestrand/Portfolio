// Kurerad faktabas — agentens ENDA sanningskälla om Emund.
// Allt agenten påstår ska gå att härleda härifrån. Uppdatera filen,
// inte prompten, när något ändras. Håll filen deterministisk
// (inga timestamps/slump) — den ingår i det cachade promptprefixet.

export const FACTS = `
## Person
- Namn: Emund Liljestrand
- Ålder: 31 år
- Bor: Kristinehamn 
- Bakgrund: Arbetade tidigare som fibertekniker, inom LSS och på ICA supermarket. 
- Intressen: Gaming, kodning, musik, discgolf.
- Kontakt: emund.l@hotmail.com · GitHub: github.com/EmundLiljestrand · +46739678848

## Yrkesprofil
- Webbutvecklare klar med sin utbildning på YH, Folkuniversitetet. Med frontend-grund (React, TypeScript, JavaScript).
- Gjorde LIA (praktik) på Probits, ett företag inom hälsa och livsstilsförändring — hamnade där djupt i backend-arkitektur, AI-system och produktionsnära infrastruktur.
- Positionering: problemlösare — löser problem oavsett var i stacken lösningen sitter. "Jag bygger system, inte demos."
- Söker sitt nästa uppdrag som utvecklare.

## Projekt 2 — AI Coach Agent (LIA 2, Probits)
En autonom AI-agent som analyserar tränings- och hälsodata och genererar personliga coachmeddelanden — med en coach i beslutsslingan (human-in-the-loop).
- Flöde: användare sparar veckoreflektion → Probits backend skickar HTTP-trigger till microservicen → Django-Q lägger jobbet på asynkron kö (svarar 202 direkt) → LangGraph-agent kör analyze_week → generate_draft (Ollama, llama3.1:8b) → draft sparas som PENDING → coach granskar/redigerar/godkänner → callback till backend.
- Tekniska poänger: IDOR-skydd via token-validering mot Probits backend (microservicen har ingen egen användartabell), idempotency-check mot duplicerade drafts, retry med backoff på LLM-anrop, dockeriserad stack med 6 containrar på Safespring GPU-VM (Nvidia A2). LLM:en kör helt lokalt — ingen data lämnar servern.
- Stack: Python, Django, LangGraph, FastAPI, Ollama (llama3.1:8b), Django-Q2, PostgreSQL, Docker, Safespring (OpenStack), GitHub Actions.
- Roll: designade och implementerade agentpipelinen och backend-API:et. Ansvarade för agentlogik, arkitektur och implementationen.

## Projekt 1 — AI Coach Chatbot (LIA 1, Probits)
GDPR-medveten AI-chatbot för hälsocoaching med lokal LLM, RAG-sökning och realtids-streaming — ingen personuppgift lämnar servern.
- Flöde: meddelande → AI Safety Middleware (PII-anonymisering med spaCy: telefonnummer, e-post, personnummer; blockerar prompt injection) → RAG-pipeline (embeddings med KBLab Swedish BERT, pgvector-sökning) → Ollama genererar svar → streamas via SSE i realtid → callback till Probits backend.
- Tekniska poänger: GDPR by design (PII anonymiseras innan LLM, lokal modell), SSE-streaming krävde custom view utanför DRF:s normala request/response-cykel, stateless token-validering per anrop, rate limiting och middleware som blockerar läckage av t.ex. connection-strängar.
- Stack: Python, Django, Django REST Framework, spaCy, pgvector, sentence-transformers, Ollama, SSE, PostgreSQL, Docker, GitHub Actions.
- Roll: med i alla tekniska beslut; ansvarade för stora delar av implementationen, säkerhetslagret och backend-arkitekturen.

## Portfoliosidan (den du befinner dig på)
- Byggd i Svelte + Vite med GSAP (ScrollTrigger) och Lenis för scroll-animationer.
- Källkod: github.com/EmundLiljestrand/Portfolio
- Den här chatten är i sig ett av Emunds projekt: en agent med function calling (den kan scrolla sidan), SSE-streaming och prompt-injection-skydd, byggd som en Cloudflare Worker mot Claude API.

## Kompetenser
- Språk & ramverk: JavaScript, TypeScript, React, Svelte, Python, Django, Node.js, Express, HTML/CSS
- AI & Data: LangGraph, RAG, embeddings, lokala LLM:er (Ollama), spaCy, pgvector
- Infrastruktur & drift: Docker, Nginx, GitHub Actions, Safespring (OpenStack), AWS
- Databaser: PostgreSQL, MongoDB, DynamoDB, Supabase

## Sektioner på sidan (för scroll_to_section)
- hero: start/intro
- projects: båda case studies (AI Coach Agent + AI Coach Chatbot)
- about: om Emund + kompetenser
- contact: kontaktuppgifter
`
