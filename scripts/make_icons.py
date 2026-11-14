from pathlib import Path
p=Path(__file__).resolve().parents[1]/'assets/icons'
icons={
'play':('Try my work','<path d="m16 11 12 8-12 8z"/>'),
'notes':('How I work','<rect x="12" y="8" width="19" height="24" rx="2"/><path d="M17 15h9m-9 5h9m-9 5h6"/>'),
'linkedin':('LinkedIn','<rect x="10" y="9" width="24" height="24" rx="3"/><path d="M16 19v8m0-13v1m6 12v-8m0 3c0-5 7-5 7 0v5"/>'),
'huggingface':('Hugging Face','<circle cx="22" cy="20" r="10"/><path d="M18 19v1m8-1v1m-8 4q4 4 8 0M10 27l-4-3m7 6-4 1m25-4 4-3m-7 6 4 1"/>'),
'code':('Code','<path d="m17 12-7 8 7 8m10-16 7 8-7 8m-3-20-4 24"/>'),
'figma':('Design','<rect x="10" y="9" width="25" height="23" rx="2"/><path d="M10 15h25m-16 0v17m6-10 5 5m0-5-5 5"/>'),
'lock':('Confidential','<rect x="11" y="17" width="22" height="17" rx="3"/><path d="M16 17v-5a6 6 0 0 1 12 0v5m-6 7v4"/>'),
'orbit':('After hours','<circle cx="22" cy="20" r="8"/><ellipse cx="22" cy="20" rx="18" ry="5" transform="rotate(-25 22 20)"/>')}
for name,(label,shape)in icons.items():
 width={'huggingface':169,'linkedin':132,'play':153,'notes':153}.get(name,140)
 svg=f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="42" viewBox="0 0 {width} 42" role="img" aria-label="{label}"><rect x=".5" y=".5" width="{width-1}" height="41" rx="6" fill="#16283a" stroke="#42566b"/><g fill="none" stroke="#b9d3e6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">{shape}</g><text x="45" y="26" fill="#e8eef3" font-family="Arial,sans-serif" font-size="14">{label}</text></svg>'
 (p/f'{name}.svg').write_text(svg)
