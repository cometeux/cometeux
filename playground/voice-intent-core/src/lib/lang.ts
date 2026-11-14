const ARABIC_RANGE = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;

export function containsArabic(text: string): boolean {
  return ARABIC_RANGE.test(text);
}

export function detectLanguageFromText(text: string): 'ar' | 'en' | 'mixed' | 'unknown' {
  const t = text.trim();
  if (!t) return 'unknown';
  let arabic = 0;
  let latin = 0;
  for (const ch of t) {
    if (/[A-Za-z]/.test(ch)) latin++;
    if (ARABIC_RANGE.test(ch)) arabic++;
  }
  if (arabic > 0 && latin > 0) return 'mixed';
  if (arabic > 0) return 'ar';
  if (latin > 0) return 'en';
  return 'unknown';
}

export function preferredSpeechLang(detected: 'ar' | 'en' | 'mixed' | 'unknown'): string {
  if (detected === 'en') return 'en-US';
  return 'ar-SA';
}

export function textDirectionForLang(lang: 'ar' | 'en' | 'mixed' | 'unknown'): 'rtl' | 'ltr' {
  if (lang === 'ar' || lang === 'mixed') return 'rtl';
  if (lang === 'en') return 'ltr';
  return 'ltr';
}
