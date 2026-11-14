# Smart Meeting Minutes — design note

**Confidential enterprise product · UX/UI design**

This note describes the problem and design reasoning generally. No interfaces, code, internal documents, organization-specific rules or production measurements are published.

## The problem

A meeting summary is only useful when people can review it, correct it and turn the relevant decisions into follow-up work. The design challenge is the transition from generated draft to a record people can use.

## My contribution

My work focuses on the user journeys and interface design for creating, reviewing, editing and finalizing meeting minutes, and following up on actions. Arabic and English are part of the experience.

| Design question | Approach | Why it matters |
|---|---|---|
| Where does AI output become a meeting record? | Give review and finalization distinct states | A generated draft needs a clear next step |
| How does someone correct the output? | Keep review and editing part of the main journey | People need a practical way to take responsibility for the record |
| What should happen after the meeting? | Make follow-up actions part of the workflow | Minutes should support the next task |
| What changes between Arabic and English? | Consider wording, direction and dense content together | Translating labels alone does not establish a usable experience |

These approaches describe design intent and scope. They do not establish measured improvements.

## Evidence available publicly

This is a sanitized account of confidential design work. The public [Action Review notebook](https://huggingface.co/spaces/Deema9/action-review) explores the narrower question of reviewing tasks, owners and deadlines using invented examples. It is separate work and does not reproduce the internal product.

No screenshots, task-time reductions or usability gains are asserted here. The public record currently supports a discussion of my design scope and reasoning; measured outcomes would require approved, attributable evidence.

