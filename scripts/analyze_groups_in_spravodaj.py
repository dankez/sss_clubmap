import json
import re

with open("docs/spravodaj_text.txt", "r", encoding="utf-8") as f:
    text = f.read()

# Load all 53 groups from sss-data.json
with open("apps/web/src/data/sss-data.json", "r", encoding="utf-8") as f:
    data = json.load(f)

groups = data["groups"]

# Common Slovak city/origin mappings based on seed contacts
city_fallback = {
    "sss-001": "Adamov Kút / Terchová",
    "sss-002": "Moldava nad Bodvou",
    "sss-003": "Rožňava",
    "sss-004": "Slovenský kras / Krásnohorská Dlhá Lúka",
    "sss-005": "Ardovo",
    "sss-006": "Banská Bystrica",
    "sss-007": "Bratislava",
    "sss-008": "Brezno",
    "sss-009": "Košice",
    "sss-010": "Čachtice",
    "sss-011": "Červené vrchy",
    "sss-012": "Bratislava - Ovsište",
    "sss-013": "Demänovská Dolina",
    "sss-014": "Detva",
    "sss-015": "Košice",
    "sss-016": "Dubnica nad Váhom",
    "sss-017": "Jánska dolina / Nízke Tatry",
    "sss-018": "Háj / Zádiel",
    "sss-019": "Handlová",
    "sss-020": "Chočské vrchy",
    "sss-021": "Považský Inovec",
    "sss-022": "Slovenský kras",
    "sss-023": "Liptovská Teplička",
    "sss-024": "Liptovský Mikuláš",
    "sss-025": "Liptovský Trnovec",
    "sss-026": "Malá Fatra",
    "sss-027": "Krásnohorská Dlhá Lúka",
    "sss-028": "Muráň",
    "sss-029": "Liptovský Mikuláš",
    "sss-030": "Nitra",
    "sss-031": "Orava",
    "sss-032": "Plavecké Podhradie",
    "sss-033": "Prešov",
    "sss-034": "Rimavská Sobota",
    "sss-035": "Rokoš / Nitrické vrchy",
    "sss-036": "Rožňava",
    "sss-037": "Ružomberok",
    "sss-038": "Slovenský raj",
    "sss-039": "Slovensko - Speleopotápanie",
    "sss-040": "Slovensko - Speleopotápanie",
    "sss-041": "Spišská Belá / Belianske Tatry",
    "sss-042": "Strážovské vrchy",
    "sss-043": "Šariš / Veľká Sviečková",
    "sss-044": "Tisovec",
    "sss-045": "Trenčín",
    "sss-046": "Tribeč",
    "sss-047": "Trnava / Malé Karpaty",
    "sss-048": "Turiec / Veľká Fatra",
    "sss-049": "Uhrovec",
    "sss-050": "Košice / UPJŠ",
    "sss-051": "Varín / Malá Fatra",
    "sss-052": "Veľká Fatra",
    "sss-053": "Žilina"
}

results = []

for group in groups:
    gid = group["id"]
    gname = group["name"]

    # Search pattern for group in text
    # Extract short search terms
    terms = [gname]
    if " – " in gname:
        terms.append(gname.split(" – ")[0])
    
    matches = []
    for term in terms:
        # Search case-insensitive
        escaped = re.escape(term.strip())
        for m in re.finditer(escaped, text, re.IGNORECASE):
            start = max(0, m.start() - 100)
            end = min(len(text), m.end() + 300)
            snippet = text[start:end].replace("\n", " ")
            matches.append(snippet)
    
    fallback = city_fallback.get(gid, "Slovensko")
    results.append({
        "id": gid,
        "name": gname,
        "matches_count": len(matches),
        "snippets": matches[:3],
        "fallback_origin": fallback
    })

print(f"Scanned {len(results)} groups across PDF text.")
with open("docs/group_scan_summary.json", "w", encoding="utf-8") as f:
    json.dump(results, f, ensure_ascii=False, indent=2)

print("Saved scan results to docs/group_scan_summary.json")
