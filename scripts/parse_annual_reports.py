import sys
import re

sys.stdout.reconfigure(encoding='utf-8')

with open("docs/spravodaj_text.txt", "r", encoding="utf-8") as f:
    text = f.read()

lines = text.split("\n")

headers = []
for idx, line in enumerate(lines):
    line_clean = line.strip()
    if re.search(r'^(Jaskyniars|Speleo|Oblastná|Sekcia|CUC|MEANDER|Žilinský|Trenčiansky|Moldavský)', line_clean, re.IGNORECASE) and len(line_clean) < 100:
        headers.append((idx + 1, line_clean))

print(f"Found {len(headers)} potential group report headers in Spravodaj SSS:")
for page_num, h in headers:
    print(f"Line {page_num}: {h}")
