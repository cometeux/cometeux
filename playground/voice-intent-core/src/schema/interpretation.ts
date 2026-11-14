import { z } from 'zod';

export const taskKindSchema = z.enum([
  'general',
  'reminder',
  'email',
  'meeting',
  'call',
  'follow-up',
  'review',
  'approval',
  'research',
  'document',
]);

export const prioritySchema = z.enum(['low', 'medium', 'high', 'urgent']);

export const interpretedPrimaryTypeSchema = z.enum([
  'task',
  'multiple_tasks',
  'reminder',
  'note',
  'idea',
  'follow-up',
  'meeting_item',
  'call',
  'email_action',
  'review_approval',
  'informational_no_action',
  'mixed_note_tasks',
]);

export const detectedLanguageSchema = z.enum(['ar', 'en', 'mixed']);

/** AI returns tasks without DB ids; we normalize after parse */
export const aiTaskSchema = z.object({
  title: z.string(),
  description: z.string(),
  taskType: taskKindSchema,
  priority: prioritySchema.optional(),
  reminderAt: z.string().nullable().optional(),
  entitiesPeople: z.array(z.string()).default([]),
  entitiesTopics: z.array(z.string()).default([]),
  suggestedEmailSubject: z.string().optional(),
  suggestedEmailBody: z.string().optional(),
  suggestedMeetingTitle: z.string().optional(),
  suggestedMeetingDescription: z.string().optional(),
  callContext: z.string().optional(),
  confidence: z.number().min(0).max(1),
});

export const aiNoteSchema = z.object({
  noteType: z.string(),
  title: z.string(),
  cleanedText: z.string(),
  tags: z.array(z.string()).default([]),
  confidence: z.number().min(0).max(1),
  suggestedNextActions: z.array(z.string()).optional(),
});

export const interpretationResultSchema = z.object({
  interpretedPrimaryType: interpretedPrimaryTypeSchema,
  /** Short headline for the capture */
  title: z.string(),
  /** When mixed or multi-task, preserve parent narrative */
  parentContextSummary: z.string().optional(),
  structuredNote: aiNoteSchema.nullable().optional(),
  tasks: z.array(aiTaskSchema).default([]),
  detectedLanguage: detectedLanguageSchema.optional(),
  reasoningBrief: z.string().optional(),
});

export type InterpretationResult = z.infer<typeof interpretationResultSchema>;
export type AiTaskPayload = z.infer<typeof aiTaskSchema>;
export type AiNotePayload = z.infer<typeof aiNoteSchema>;

export function safeParseInterpretation(
  raw: unknown,
): { ok: true; data: InterpretationResult } | { ok: false; error: string } {
  const parsed = interpretationResultSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.message };
  }
  return { ok: true, data: parsed.data };
}
