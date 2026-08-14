import urllib.request
import pypdf
import os

url = "https://uge-share.science.upjs.sk/webshared/GCass_web_files/articles/GC-2008-2-2/GC2-2-1.pdf"
pdf_path = r"C:\Users\A1497335\.gemini\antigravity-cli\brain\9219d6b6-5fcf-43e6-8e0b-f6362630be6a\scratch\Krasove_uzemia_Slovenska_Hochmuth.pdf"
txt_path = r"C:\Users\A1497335\.gemini\antigravity-cli\brain\9219d6b6-5fcf-43e6-8e0b-f6362630be6a\scratch\Krasove_uzemia_Slovenska_Hochmuth.txt"

print(f"Downloading Hochmuth monograph from {url}...")
req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
with urllib.request.urlopen(req) as resp, open(pdf_path, "wb") as f:
    f.write(resp.read())

print("Downloaded. Extracting text...")
reader = pypdf.PdfReader(pdf_path)
print(f"Total pages: {len(reader.pages)}")

with open(txt_path, "w", encoding="utf-8") as out:
    for i, page in enumerate(reader.pages):
        text = page.extract_text()
        out.write(f"\n\n--- PAGE {i+1} ---\n\n")
        out.write(text)

print(f"Extraction complete: {txt_path}")
