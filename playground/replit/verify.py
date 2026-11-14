"""Check archived source integrity and the recorded syntax result; no GUI execution."""
import ast
import hashlib
import json
from pathlib import Path

root = Path(__file__).resolve().parent
rows = json.loads((root / "manifest.json").read_text())
checked = 0
for row in rows:
    if row["status"] == "empty_editor":
        continue
    path = root / "originals" / row["project"] / "main.py"
    data = path.read_bytes()
    if hashlib.sha256(data).hexdigest() != row["sha256"]:
        raise SystemExit("Source changed: " + row["project"])
    status = "syntax_pass"
    try:
        ast.parse(data)
    except SyntaxError as exc:
        status = f"syntax_error_line_{exc.lineno}"
    if status != row["status"]:
        raise SystemExit("Syntax status changed: " + row["project"])
    checked += 1
print(f"Verified {checked} unchanged source snapshots; includes one documented syntax failure.")
