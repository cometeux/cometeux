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
 '<rect width="1200" height="365" rx="4" fill="#15283a"/><text x="40" y="45" fill="#a9c5db" font-family="monospace" font-size="15" letter-spacing="2">ON THE WORKBENCH / LATEST PUBLIC UPDATES</text>']
 for i,row in enumerate(rows):
  y=90+i*88
  # Escape every remote string; a commit title must remain text, never SVG markup.
  label=escape(NAMES[i]);date=escape(row['date']);sha=escape(row['sha'][:7]);message=escape(row['message'][:92])
  parts.append(f'<circle cx="47" cy="{y+8}" r="4" fill="#d9ba94"/><text x="70" y="{y+14}" fill="#edf1f3" font-family="Georgia,serif" font-size="24">{label}</text><text x="1148" y="{y+12}" text-anchor="end" fill="#a9c5db" font-family="monospace" font-size="16">{date} / {sha}</text><text x="70" y="{y+44}" fill="#b5ccdd" font-family="Arial,sans-serif" font-size="18">{message}</text>')
 parts.append('</svg>');return '\n'.join(parts)+'\n'
if __name__=='__main__':
 parser=argparse.ArgumentParser();parser.add_argument('--input');args=parser.parse_args()
 rows=json.loads(Path(args.input).read_text())if args.input else fetch_updates()
 (ROOT/'assets/workbench.svg').write_text(render(rows))
