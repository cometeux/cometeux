import type { InterpretationResult } from '../../schema/interpretation';
import { detectLanguageFromText } from '../../lib/lang';

/** Conservative local fallback. A cue anywhere in prose is not an instruction. */
export function interpretWithHeuristics(transcript: string): InterpretationResult {
  const t = transcript.trim();
  const lang = detectLanguageFromText(t);
  const detectedLanguage = lang === 'unknown' ? 'mixed' : lang;
  const normalize = (value: string) => value.normalize('NFKC').replace(/[\u064b-\u065f\u0670]/g, '').trim();
  const segments = t.split(/[.!?\n؛]+|\s+and\s+|\s+و(?=\s|أرسل|ارسل|راجع|اتصل|احجز|تابع|ذكرني)/i).map(x => x.trim()).filter(Boolean);
  const englishAction = /^(?:(?:please|kindly)\s+|I\s+(?:need to|should|will|must)\s+|(?:need|remember)\s+to\s+)?(?:send|call|email|draft|schedule|book|review|submit|follow[ -]up)\b/i;
  const arabicAction = /^(?:(?:من فضلك|لو سمحت|الرجاء|لازم|احتاج|أحتاج)\s+)?(?:أرسل|ارسل|ابعث|ابعت|اتصل|كلم|راجع|أراجع|سلم|احجز|أحجز|تابع|نفذ|سوي|اعمل|أعمل)(?:\s|$)/;
  const reminder = /^(?:remind me|reminder\s*:|don't forget|do not forget|ذكرني|تذكير\s*:|تذكرني)(?:\s|$)/i;
  const negated = /^(?:(?:please|kindly)\s+)?(?:(?:I|we|you|they|he|she)\s+)?(?:do not|don't|never|must not|should not|shouldn't|will not|won't|cannot|can't|no need to|not to)\b|^(?:لا\s|لا(?:ترسل|تراجع|تتصل|تحجز)|لن\s|ما راح\s)/i;
  const actionSegments = segments.filter(segment => {
    const value = normalize(segment);
    // "Don't forget" is a positive reminder; "don't send" is not.
    if (reminder.test(value)) return true;
    return !negated.test(value) && (englishAction.test(value) || arabicAction.test(value));
  });
  const contextSegments = segments.filter(s => !actionSegments.includes(s));
  const isIdea = /(فكرة|ممكن ن|نقدر ن|what if|\bidea\b)/i.test(t);
  const note = (text: string) => ({ noteType: isIdea ? 'idea' : 'note', title: text.slice(0,80) || 'Empty capture', cleanedText: text, tags: [isIdea ? 'idea' : 'note'], confidence: 0.4 });
  if (!actionSegments.length) return {
    interpretedPrimaryType: isIdea ? 'idea' : 'note', title: t.slice(0,80) || 'Empty capture', parentContextSummary: t,
    structuredNote: note(t), tasks: [], detectedLanguage, reasoningBrief: 'local_no_explicit_action',
  };
  // Preserve overflow in the note instead of silently losing unextracted clauses.
  const selected = actionSegments.slice(0,6);
  const context = [...contextSegments, ...actionSegments.slice(6)].join('. ');
  const tasks = selected.map(segment => ({ title: segment.slice(0,120), description: segment,
    taskType: reminder.test(normalize(segment)) ? 'reminder' as const : 'general' as const,
    reminderAt: null, entitiesPeople: [], entitiesTopics: [], confidence: 0.4,
  }));
  return {
    interpretedPrimaryType: context ? 'mixed_note_tasks' : tasks.length > 1 ? 'multiple_tasks' : tasks[0].taskType === 'reminder' ? 'reminder' : 'task',
    title: t.slice(0,80), parentContextSummary: t, structuredNote: context ? note(context) : null,
    tasks, detectedLanguage, reasoningBrief: 'local_explicit_clauses_only',
  };
}
