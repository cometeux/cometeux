# Voice capture — keep the thought first

**Arabic-first product exploration · desktop and web prototypes**

A quick thought can contain a note, an idea, a reminder and something to do. Turning every sentence into a task loses that distinction. These prototypes explore recording first, then organizing the result.

## What exists

The local project review found a browser MVP and desktop Electron iterations, plus a broader capture workspace. They are related explorations, not separate launched products.

| Area | Observed in the implementation |
|---|---|
| Browser capture | MediaRecorder audio, optional browser live transcription and IndexedDB storage |
| Save before enrichment | The stopped recording is persisted before transcription and interpretation are requested |
| Structure | Separate types for notes, ideas, tasks, reminders and mixed content |
| Recovery path | A conservative text heuristic is used when server interpretation fails |
| Desktop exploration | Floating capture views, local storage and reminder logic |
| Broader capture exploration | Structured outputs and mind-map/export paths in a separate prototype |

## A useful design distinction

“Save first” here means saving after recording stops, before AI processing. It does **not** establish crash recovery while recording, nor guarantee that a recording survives a tab close before the save.

The local text fallback prefers notes over inventing tasks, but its keyword rules can misclassify intent or split an Arabic sentence poorly. A confidence field is not a calibrated accuracy measure.

## Local storage and AI are separate

Storage is local in these prototypes. Configured cloud transcription and interpretation send the relevant audio or text to the provider. Browser speech behavior also depends on the browser implementation. This is not a claim of fully offline speech recognition.

## Verification status

The source and documentation were inspected in November 2026. On 15 November 2026 (Riyadh), the browser MVP passed its TypeScript application check and ESLint check. These static checks do not exercise audio recording or provider calls. Microphone permissions, real Arabic recordings, reload recovery, desktop reminders and provider calls still need a fresh end-to-end verification before a public demo is presented as ready.

The public note does not include organization-specific styling, account configuration, recordings or private source. The work was developed with AI assistance.

## بالعربي

الفكرة أن تُحفظ اللقطة أولًا، ثم تُنظم إلى ملاحظة أو فكرة أو مهمة أو تذكير، دون تحويل كل كلام الشخص إلى مهام. راجعت تنفيذ الويب والنسخ المكتبية؛ وجود الكود لا يغني عن اختبار التسجيل والاستعادة والتذكيرات فعليًا قبل النشر كتجربة جاهزة.
