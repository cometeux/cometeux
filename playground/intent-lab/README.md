# Intent Lab

A small Generative UI playground by Deema Alrafi. A model turns a task into an interactive workspace built from five validated components: checklist, choices, timeline, metrics and note.

## Try it

[Open Intent Lab](https://deema9-intent-lab.static.hf.space/index.html) · [Play Orbit Memory](https://deema9-intent-lab.static.hf.space/index.html#orbit) · [Hugging Face Space](https://huggingface.co/spaces/Deema9/intent-lab)

Three recorded examples work without an API key and are labeled as examples. Live generation uses the visitor's own OpenAI key and editable model ID. The key stays in tab memory and requests go directly to https://api.openai.com/v1/responses. No hosted server receives the key; the app does not use localStorage, analytics or remote scripts. Provider usage may incur charges. Prefer a temporary restricted key and public or invented inputs.

The model returns structured JSON; Zod validates it before React renders it. Unknown fields and component types are rejected. Model output is text data: no evaluated JavaScript, model-controlled HTML, external links or tool execution. The existing interface remains available after errors, refusals, cancellation and invalid imports.

Visitors can tick tasks, select alternatives, inspect the spec, undo generation, export a workspace and re-import its interface. Interaction records are exported for inspection; imports reset control state. Nothing is sent, scheduled or saved to a remote database by the generated controls.

## Orbit Memory

The After hours tab contains a real browser memory game with nine stars, five rounds, three chances, replay and restart controls. There is no score submission or leaderboard. It replaces the earlier GitHub-only disclosure puzzle, which was easy to mistake for a non-working game.

## Build

Node.js 22 or newer:

```sh
npm install
npm test
npm run build
```

Open or host dist/index.html. The bundle includes its CSS and JavaScript; recorded examples and the game require no runtime CDN. The browser must permit requests to the provider for live generation. Provider and account errors are surfaced rather than replaced with fake generated results.

## Open-source credits

- React 19.2.5 — MIT; rendering and local interaction state.
- Zod 4.3.6 — MIT; catalog validation and JSON Schema generation.
- esbuild 0.27.7 — MIT; build-time single-file bundling.
- The catalog-constrained approach is informed by the open-source [json-render](https://github.com/vercel-labs/json-render) pattern. This implementation uses its own deliberately small renderer; it does not claim to include the json-render package.
- [OpenAI Structured Outputs](https://developers.openai.com/api/docs/guides/structured-outputs?api-mode=responses) supplies the API output format.

The interface, product framing, integration and tests were developed with AI assistance. No model was trained for this project.

## Verification

Nine engine tests passed locally on 15 November 2026 (Riyadh). They cover catalog limits, examples, invalid component props, refusals/incomplete responses, request shape, fixed provider destination, missing key/provider errors, abort propagation and valid game patterns. Provider calls use a mocked transport in these tests. No paid live model request has been made during this build. The published browser build was checked on 15 November 2026 (Riyadh): example switching, checklist and choice inputs, spec view, missing-key feedback, game start, constellation replay, incorrect-input feedback and restart. A full five-round winning run, workspace import/export and responsive/device coverage have not yet been verified in-browser. Live BYOK generation remains unverified with a real key.

## Limits

A focused prototype, not a website generator. Five component types, no arbitrary code, no streaming, no backend persistence, no model evaluation or independent user study. Generated plans and numbers require judgment. Descriptions of privacy apply to this app's code, not browser extensions or the hosting/provider services' ordinary access logs.
