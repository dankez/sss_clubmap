import pypdf
import json
import re

pdf_path = "docs/spravodaj_1_2026.pdf"
reader = pypdf.PdfReader(pdf_path)

print(f"Total pages in PDF: {len(reader.pages)}")

# Extract text page by page
pages_text = []
full_text = ""
for i, page in enumerate(reader.pages):
    text = page.extract_text() or ""
    pages_text.append({"page": i + 1, "text": text})
    full_text += f"\n--- PAGE {i + 1} ---\n" + text

with open("docs/spravodaj_text.txt", "w", encoding="utf-8") as f:
    f.write(full_text)

print("Saved full PDF text to docs/spravodaj_text.txt")
