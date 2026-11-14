# How I think through a product

I’m interested in the moment when an idea meets actual work: someone is interrupted, an answer is incomplete, or the next step is unclear. That is usually where I start.

## Start with the situation

Before adding a feature, I want to know what the person is trying to finish, what they have in front of them and what happens if they get it wrong. “Use AI” is not a problem statement.

For a voice note, the first question is whether the thought was captured. Structuring it comes after that. For a meeting record, the question is what someone can review, correct and act on.

## Let the shape of the information decide the interface

A thought is not always a task. A search result is not always an answer. I want the interface to preserve those distinctions.

The voice-capture prototypes keep notes, ideas, reminders and tasks separate. The retrieval experiment opens the original passage so someone can check what the result actually says. These are implementation choices from an assisted build, not claims of measured user outcomes.

## Make the uncertain part visible

I care about what happens when the happy path ends. If a column is ambiguous, ask. If the source does not contain the answer, do not make a similarity score sound like certainty. If an agent fails, record the failure and leave a way to recover.

[Meyar](MEYAR.md) explores this through price validation, recorded jobs and escalation. [Arabic Retrieval Lab](https://github.com/cometeux/arabic-ai-quality-lab/blob/main/docs/EVALUATION.md) documents the questions it still mishandles.

## Build something that can disagree with me

A prototype is useful when it helps test an assumption. The search experiment’s first fixture looked reassuring; the harder diagnostic exposed paraphrase and missing-information problems. That is a better basis for the next decision.

The next evidence I want is independent observation: can someone finish the task, understand the result and recover without an explanation? [The review tasks](https://github.com/cometeux/arabic-ai-quality-lab/blob/main/docs/REVIEW_PROTOCOL.md) make that question concrete.

## Keep a point of view

I want Arabic to feel native to the workflow. I like interfaces with character, but I also want the small details to earn their place: a label that explains what happens, a source that opens where it should, a saved thought that survives the next step.

Outside work, I’m drawn to astronomy, story-driven games, cats and quiet nights. The portfolio leaves a little room for that too.

---

**بالعربي:** أبدأ من الموقف الذي يمر فيه الشخص، وأحدد الشيء الذي يحاول إنجازه. أبني تجربة تساعده يفهم ويقرر ويصحح، وأختبر الافتراضات بدل الاكتفاء بشكل مقنع. أحب أن يكون للتصميم طابع، وأن يكون لكل تفصيل سبب.

[Decisions and contribution evidence](CONTRIBUTIONS.md) · [Selected project notes](PROJECTS.md)
