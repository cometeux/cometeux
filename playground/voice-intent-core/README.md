# Voice intent core — reviewed local fallback

This is the small local text classifier extracted from my voice-capture prototype, with a review patch and 18 regression tests. It is not speech recognition, a trained model, or a released voice app.

The original keyword fallback treated negative instructions and surrounding context as tasks. This version recognizes explicit action clauses, preserves other content in a note, and keeps overflow clauses instead of silently dropping them. Dates remain unparsed; extracted reminders are not scheduled.

```sh
npm install
npm test
```

No API key, network request, recording or account data is used. Arabic strings are test inputs and language rules; documentation is in English.

## Evidence and limits

18 tests pass: English/Arabic negation, explicit actions, mixed context, multiple actions, positive reminder wording, overflow and empty input. The complete review copy of the original browser MVP also passed its production build and ESLint after the patch.

The original local project has not been modified. This is a reviewable patch in a separate copy. It needs integration and microphone/browser verification before the complete voice app is called ready. Regex rules are intentionally limited: quoted instructions, indirect requests, dialects and complex negation may still be misclassified. Test counts are not accuracy measurements.

Developed with AI assistance. Build tooling: esbuild (MIT). The schema file is included for the original TypeScript contract; the runtime core does not import Zod.
