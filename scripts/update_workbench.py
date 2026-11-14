"""Render actual latest public repository updates; no streak or skill scores."""
import argparse,json,os,urllib.request
from pathlib import Path
from xml.sax.saxutils import escape
REPOS=['arabic-ai-quality-lab','synthetic-enterprise-knowledge','data-ai-agent']
NAMES=['Arabic Retrieval Lab','Synthetic Knowledge','Datara']
ROOT=Path(__file__).resolve().parents[1]
def fetch_updates():
 rows=[]
 for repo in REPOS:
  headers={'Accept':'application/vnd.github+json','User-Agent':'cometeux-profile'}
  token=os.environ.get('GH_TOKEN')
  if token:headers['Authorization']='Bearer '+token
  req=urllib.request.Request('https://api.github.com/repos/cometeux/'+repo+'/commits?per_page=1',headers=headers)
  with urllib.request.urlopen(req,timeout=30)as response:item=json.load(response)[0]
  rows.append(dict(repo=repo,sha=item['sha'],date=item['commit']['author']['date'][:10],message=item['commit']['message'].splitlines()[0]))
 return rows

def render(rows):
 parts=['<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="365" viewBox="0 0 1200 365" role="img" aria-labelledby="title desc">',
 '<title id="title">Latest public workbench updates</title><desc id="desc">Latest commit dates and messages from three public repositories. Automatically refreshed from the GitHub API.</desc>',
 '<rect width="1200" height="365" fill="#080a10" shape-rendering="crispEdges"/><text x="40" y="45" fill="#9dbcf4" font-family="monospace" font-size="15" letter-spacing="2">ON THE WORKBENCH / LATEST PUBLIC UPDATES</text>']
 parts.append('<style>.signal{animation:pulse 3s steps(2,end) infinite}@keyframes pulse{50%{opacity:.35}}@media(prefers-reduced-motion:reduce){.signal{animation:none}}</style><g fill="#7295dd" shape-rendering="crispEdges"><path d="M22 20h12v4H26v8h-4zM1166 20h12v12h-4v-8h-8zM22 333h4v8h8v4H22zM1174 333h4v12h-12v-4h8z"/><path class="signal" d="M1115 33h4v-4h4v4h4v4h-4v4h-4v-4h-4z"/><rect x="1094" y="42" width="4" height="4"/><rect x="1145" y="29" width="4" height="4"/><path d="M40 62h1120v2H40zM70 156h1090v1H70zM70 244h1090v1H70z" fill="#233450"/></g>')
 for i,row in enumerate(rows):
  y=90+i*88
  # Escape every remote string; a commit title must remain text, never SVG markup.
  label=escape(NAMES[i]);date=escape(row['date']);sha=escape(row['sha'][:7]);message=escape(row['message'][:88])
  parts.append(f'<path d="M43 {y+4}h8v4h4v8h-4v4h-8v-4h-4v-8h4z" fill="#7295dd"/><text x="70" y="{y+14}" fill="#e5edff" font-family="monospace" font-weight="bold" font-size="24">{label}</text><text x="1148" y="{y+12}" text-anchor="end" fill="#9dbcf4" font-family="monospace" font-size="16">{date} / {sha}</text><text x="70" y="{y+44}" fill="#9dbcf4" font-family="monospace" font-size="18">{message}</text>')
 parts.append('</svg>');return '\n'.join(parts)+'\n'
if __name__=='__main__':
 parser=argparse.ArgumentParser();parser.add_argument('--input');args=parser.parse_args()
 rows=json.loads(Path(args.input).read_text())if args.input else fetch_updates()
 (ROOT/'assets/workbench.svg').write_text(render(rows))
