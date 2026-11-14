# Decisions I bring to the work

My work connects research, product workflows and interface design. These examples separate the direction I set from the implementation choices developed with coding assistance.

## Direction → change → evidence

| My direction | Change in the work | Inspect |
|---|---|---|
| Make the work useful in Arabic, with natural language | Arabic search and task-review workflows, rather than a generic chatbot | [Search workspace](https://huggingface.co/spaces/Deema9/arabic-retrieval-lab) and [task notebook](https://huggingface.co/spaces/Deema9/action-review) |
| Give the portfolio a personal identity; replace the first project graphics | Revised night-scene covers and personal details around astronomy, games, cats and coffee | [Profile assets](../assets) |
| Protect confidential products, including their identity | General project summaries, a public alias for Knowledge Companion, and separate synthetic experiments | [Meeting-minutes design note](MEETING_MINUTES.md) |
| Strengthen the technical evidence and make the projects actually work | Import/export, exact source spans, offline evidence verification and evaluation reports | [Case study](https://github.com/cometeux/arabic-ai-quality-lab/blob/main/docs/CASE_STUDY.md) and [verification](https://github.com/cometeux/arabic-ai-quality-lab/blob/main/docs/VERIFY.md) |
| Explore an independent venture with no upfront spending; require evidence before committing to an idea | Meyar's spreadsheet-review prototype and four bounded operating roles | [Meyar case study](MEYAR.md) |

These are examples of product direction and review priorities. They are not a claim that I personally devised every engineering mechanism below.

## Engineering decisions developed in the assisted build

| Problem encountered | Decision implemented | Trade-off or remaining question |
|---|---|---|
| A normalization-focused fixture produced a misleadingly easy 100% result | Add a harder 40-case diagnostic with paraphrases, multiple relevant sources and missing information | Labels are still AI-assisted and visible during development |
| A plausible retrieved passage can look like an answer | Show source passages and separate similarity from truth | The tool does not automatically detect whether a question can be answered |
| An exported quotation can change independently of its source | Preserve exact spans and verify them against a workspace fingerprint | Integrity does not establish source credibility |
| A repeated agent event can trigger repeated work | Record role/event identity and reuse the result; retry failures | Local tests do not establish unattended production reliability |
| A payment link could enable selling before readiness | Separate preview/test/live output and require launch evidence | Actual merchant-file and payment validation remain open |

## Authorship and evidence

I set product direction, constraints and revision priorities. Research, implementation, synthetic data, tests and documentation use AI assistance. Existing models and upstream projects retain their credits in the repositories.

Functional checks, synthetic evaluations and independent user sessions are different evidence types. [The review record](https://github.com/cometeux/arabic-ai-quality-lab/blob/main/docs/REVIEW_RESULTS.md) tracks independent sessions separately; none are recorded yet.

## بالعربي

مساهمتي تتمثل في توجيه المنتج وتحديد المشكلة والقيود ومراجعة التجربة وطلب التعديلات. الجدول يفصل بين هذا الدور وبين القرارات الهندسية التي تطورت أثناء التنفيذ بمساعدة الذكاء الاصطناعي، ويربط كل مثال بما يمكن فحصه.
