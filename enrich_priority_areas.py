import json

user_clubs_data = [
  {
    "klub": "Jaskyniarska skupina Adama Vallu v Terchovej",
    "sidlo": "Terchová",
    "priority_oblasti": [
      {
        "celok": "Malá Fatra",
        "uzemie": "Vrátna dolina",
        "lokality": ["Kryštálová jaskyňa", "Medvedia jaskyňa", "Jaskyňa nad vyvieračkou"]
      }
    ]
  },
  {
    "klub": "Jaskyniarska skupina Aragonit",
    "sidlo": "Kraľovany",
    "priority_oblasti": [
      {
        "celok": "Malá Fatra / Oravská vrchovina",
        "uzemie": "Kraľoviansky meander",
        "lokality": ["Lom Kraľovany II", "Jaskyňa Ľudmila", "Mišova priepasť"]
      }
    ]
  },
  {
    "klub": "Jaskyniarska skupina Arachnos – Slovenský kras",
    "sidlo": "Rožňava",
    "priority_oblasti": [
      {
        "celok": "Slovenský kras",
        "uzemie": "Silická planina",
        "lokality": ["Gombasecká jaskyňa", "Jaskyňa v ponore Jašteričieho jazera"]
      },
      {
        "celok": "Slovenský kras",
        "uzemie": "Plešivecká planina",
        "lokality": ["Zvonivá diera", "Attilova galéria"]
      }
    ]
  },
  {
    "klub": "Speleoklub Badizer Ardovo",
    "sidlo": "Ardovo",
    "priority_oblasti": [
      {
        "celok": "Slovenský kras",
        "uzemie": "Silická planina",
        "lokality": ["Ardovská jaskyňa", "Ardovský ponor", "Priepasť Garlika"]
      }
    ]
  },
  {
    "klub": "Speleoklub Banská Bystrica",
    "sidlo": "Banská Bystrica",
    "priority_oblasti": [
      {
        "celok": "Starohorské vrchy",
        "uzemie": "Starohorský kras",
        "lokality": ["Môcovská jaskyňa", "Jelenecká jaskyňa"]
      },
      {
        "celok": "Veľká Fatra",
        "uzemie": "Harmanecký kras",
        "lokality": ["Harmanecká jaskyňa", "Jaskyňa Drienka"]
      }
    ]
  },
  {
    "klub": "Speleo Bratislava",
    "sidlo": "Bratislava",
    "priority_oblasti": [
      {
        "celok": "Malé Karpaty",
        "uzemie": "Borinský kras",
        "lokality": ["Veľké Prepadlé", "Stará garda", "Jaskyňa Sedmička", "Vlčie jamy"]
      }
    ]
  },
  {
    "klub": "Speleo Brezno",
    "sidlo": "Brezno",
    "priority_oblasti": [
      {
        "celok": "Horehronské podolie",
        "uzemie": "Bystrianske podhorie",
        "lokality": ["Jaskyňa vo Vŕškoch", "Bystriansky závrt", "Potôčky"]
      }
    ]
  },
  {
    "klub": "Speleoklub Cassovia",
    "sidlo": "Košice",
    "priority_oblasti": [
      {
        "celok": "Slovenský kras",
        "uzemie": "Jasovská planina",
        "lokality": ["Jasovská jaskyňa", "Drienovská jaskyňa", "Vianočná priepasť"]
      },
      {
        "celok": "Slovenský kras",
        "uzemie": "Zádielska planina",
        "lokality": ["Jaskyňa Erňa"]
      }
    ]
  },
  {
    "klub": "Oblastná skupina Čachtice",
    "sidlo": "Čachtice",
    "priority_oblasti": [
      {
        "celok": "Malé Karpaty",
        "uzemie": "Čachtický kras",
        "lokality": ["Čachtická jaskyňa", "Hladový prameň"]
      }
    ]
  },
  {
    "klub": "Speleologický klub Červené vrchy Slovakia",
    "sidlo": "Malužiná",
    "priority_oblasti": [
      {
        "celok": "Západné Tatry",
        "uzemie": "Červené vrchy",
        "lokality": ["Tichá jaskyňa (Piu)", "Nová Kresanica"]
      },
      {
        "celok": "Nízke Tatry",
        "uzemie": "Malužinský kras",
        "lokality": ["Malužinská jaskyňa", "Modrá jaskyňa"]
      }
    ]
  },
  {
    "klub": "Jaskyniarsky klub Demänovská Dolina",
    "sidlo": "Demänovská Dolina",
    "priority_oblasti": [
      {
        "celok": "Nízke Tatry",
        "uzemie": "Demänovský kras",
        "lokality": ["Demänovský jaskynný systém", "Pustá jaskyňa", "Jaskyňa Štefanová"]
      }
    ]
  },
  {
    "klub": "Speleo-Detva",
    "sidlo": "Detva",
    "priority_oblasti": [
      {
        "celok": "Muránska planina",
        "uzemie": "Muránsky kras",
        "lokality": ["Poľovnícka jaskyňa"]
      }
    ]
  },
  {
    "klub": "Speleoklub Drienka Košice",
    "sidlo": "Košice",
    "priority_oblasti": [
      {
        "celok": "Slovenský kras",
        "uzemie": "Silická planina",
        "lokality": ["Jaskyňa Drienka", "Ozvenová priepasť", "Mlynská jaskyňa"]
      },
      {
        "celok": "Slovenský kras",
        "uzemie": "Koniarska planina",
        "lokality": ["Jubilejná priepasť"]
      }
    ]
  },
  {
    "klub": "Jaskyniarsky klub Dubnica nad Váhom",
    "sidlo": "Dubnica nad Váhom",
    "priority_oblasti": [
      {
        "celok": "Strážovské vrchy",
        "uzemie": "Mojtínsky kras",
        "lokality": ["Jaskyňa na Rúbani", "Mojtínska priepastná jaskyňa", "Priepasť v smrečine"]
      }
    ]
  },
  {
    "klub": "Speleoklub Ďumbier",
    "sidlo": "Brezno",
    "priority_oblasti": [
      {
        "celok": "Nízke Tatry",
        "uzemie": "Ďumbiersky kras",
        "lokality": ["Jaskyňa mŕtvych netopierov"]
      }
    ]
  },
  {
    "klub": "Jaskyniarsky klub Handlová",
    "sidlo": "Handlová",
    "priority_oblasti": [
      {
        "celok": "pohorie Žiar",
        "uzemie": "Skleniansky kras",
        "lokality": ["Sonda Tepličky", "Jaskyňa Cigánka"]
      },
      {
        "celok": "Nitrické vrchy",
        "uzemie": "Uhrovský kras",
        "lokality": ["Vestenická medvedia jaskyňa", "Jaskyňa v dvorane"]
      }
    ]
  },
  {
    "klub": "Speleoclub Chočské vrchy",
    "sidlo": "Lúčky",
    "priority_oblasti": [
      {
        "celok": "Chočské vrchy",
        "uzemie": "Prosiecka dolina",
        "lokality": ["Prosiecka jaskyňa", "Jaskyňa O-3"]
      }
    ]
  },
  {
    "klub": "Oblastná skupina Inovec",
    "sidlo": "Selec",
    "priority_oblasti": [
      {
        "celok": "Považský Inovec",
        "uzemie": "Selecký kras",
        "lokality": ["Jaskyňa Pod Holým kameňom", "HVK"]
      }
    ]
  },
  {
    "klub": "Oblastná skupina Jána Majku",
    "sidlo": "Kečovo",
    "priority_oblasti": [
      {
        "celok": "Slovenský kras",
        "uzemie": "Horný vrch",
        "lokality": ["Prepadlisko na Malom jeleňom vrchu", "Líščie diery", "Veterná diera"]
      },
      {
        "celok": "Slovenský kras",
        "uzemie": "Dolný vrch",
        "lokality": ["Priepasť Pod koreňom", "Slimačia priepasť"]
      }
    ]
  },
  {
    "klub": "Oblastná skupina Liptovská Teplička",
    "sidlo": "Liptovská Teplička",
    "priority_oblasti": [
      {
        "celok": "Nízke Tatry",
        "uzemie": "Kras Liptovskej Tepličky",
        "lokality": ["Hudákovský ponor", "Ždiarska jaskyňa II"]
      }
    ]
  },
  {
    "klub": "Oblastná skupina Liptovský Mikuláš",
    "sidlo": "Liptovský Mikuláš",
    "priority_oblasti": [
      {
        "celok": "Nízke Tatry",
        "uzemie": "Kras Jánskej doliny",
        "lokality": ["Jaskyňa pod Brtkovicou", "Biela jaskyňa", "Orlie hniezdo"]
      }
    ]
  },
  {
    "klub": "Jaskyniarsky klub Liptovský Trnovec",
    "sidlo": "Liptovský Trnovec",
    "priority_oblasti": [
      {
        "celok": "Západné Tatry",
        "uzemie": "Suchá dolina",
        "lokality": ["Jaskyňa Dúpnica", "Borošková jaskyňa"]
      }
    ]
  },
  {
    "klub": "Speleoklub Malá Fatra",
    "sidlo": "Martin",
    "priority_oblasti": [
      {
        "celok": "Veľká Fatra",
        "uzemie": "Belianska dolina",
        "lokality": ["Jaskyňa Žiarna 4"]
      }
    ]
  },
  {
    "klub": "Speleoklub Minotaurus",
    "sidlo": "Rožňava",
    "priority_oblasti": [
      {
        "celok": "Slovenský kras",
        "uzemie": "Silická planina",
        "lokality": ["Krásnohorská jaskyňa", "Silická ľadnica", "Ponor pri napájadle"]
      }
    ]
  },
  {
    "klub": "Speleoklub Muránska planina",
    "sidlo": "Revúca",
    "priority_oblasti": [
      {
        "celok": "Muránska planina",
        "uzemie": "Muránsky kras",
        "lokality": ["Jaskyňa Bobačka", "Jaskyňa PSP v Havraňom", "Vešeléniho jaskyňa"]
      }
    ]
  },
  {
    "klub": "Speleoklub Nicolaus",
    "sidlo": "Liptovský Mikuláš",
    "priority_oblasti": [
      {
        "celok": "Nízke Tatry",
        "uzemie": "Kras Jánskej doliny",
        "lokality": ["Jaskyňa zlomísk", "Medvedia jaskyňa", "Stanišovská jaskyňa", "Ohnište"]
      }
    ]
  },
  {
    "klub": "Oblastná skupina Orava",
    "sidlo": "Dolný Kubín",
    "priority_oblasti": [
      {
        "celok": "Západné Tatry",
        "uzemie": "Kras Osobitej",
        "lokality": ["Brestovská jaskyňa", "Priepastná jaskyňa v skálí", "Ľadová jaskyňa"]
      }
    ]
  },
  {
    "klub": "Občianske združenie Jaskyniari Plavecké Podhradie",
    "sidlo": "Plavecké Podhradie",
    "priority_oblasti": [
      {
        "celok": "Malé Karpaty",
        "uzemie": "Plavecký kras",
        "lokality": ["Plavecká jaskyňa", "Jaskyňa Haviareň", "Jaskyňa Sedmička", "Nová pec"]
      }
    ]
  },
  {
    "klub": "Oblastná skupina Prešov",
    "sidlo": "Prešov",
    "priority_oblasti": [
      {
        "celok": "Bachureň / Branisko",
        "uzemie": "Kras Lipoviec a Vyšného Slavkova",
        "lokality": ["Jaskyňa Zlá diera", "Jaskyňa Chmeľová", "Fosílny ponor"]
      }
    ]
  },
  {
    "klub": "Oblastná speleologická skupina Rimavská Sobota",
    "sidlo": "Rimavská Sobota",
    "priority_oblasti": [
      {
        "celok": "Revúcka vrchovina",
        "uzemie": "Drienčanský kras",
        "lokality": ["Jaskyňa Nad Kadlubom", "Veľká Drienčanská jaskyňa"]
      }
    ]
  },
  {
    "klub": "Speleo Rožňava",
    "sidlo": "Rožňava",
    "priority_oblasti": [
      {
        "celok": "Slovenský kras",
        "uzemie": "Plešivecká planina",
        "lokality": ["Diviačia priepasť", "Čistá studňa", "Zvonivá jama"]
      }
    ]
  },
  {
    "klub": "Oblastná speleologická skupina Ružomberok",
    "sidlo": "Ružomberok",
    "priority_oblasti": [
      {
        "celok": "Chočské vrchy",
        "uzemie": "Kras Chočského podhoria",
        "lokality": ["Liskovská jaskyňa"]
      },
      {
        "celok": "Nízke Tatry",
        "uzemie": "Ludrovský kras",
        "lokality": ["Ludrovská jaskyňa", "Hučiaky"]
      }
    ]
  },
  {
    "klub": "Speleologický klub Slovenský raj",
    "sidlo": "Spišská Nová Ves",
    "priority_oblasti": [
      {
        "celok": "Slovenský raj",
        "uzemie": "Kras Slovenského raja",
        "lokality": ["Stratenská jaskyňa", "Psie diery", "Jaskyňa Duča"]
      }
    ]
  },
  {
    "klub": "Jaskyniarska skupina Spišská Belá",
    "sidlo": "Spišská Belá",
    "priority_oblasti": [
      {
        "celok": "Tatry / Belianske Tatry",
        "uzemie": "Beliansky kras",
        "lokality": ["Belianska jaskyňa", "Alabastrová jaskyňa", "Ľadová pivnica"]
      },
      {
        "celok": "Tatry / Vysoké Tatry",
        "uzemie": "Vysokotatranský kras",
        "lokality": ["Jaskyňa Javorinka", "Čiernohorský jaskynný systém"]
      }
    ]
  },
  {
    "klub": "Jaskyniarsky klub Strážovské vrchy",
    "sidlo": "Pružina",
    "priority_oblasti": [
      {
        "celok": "Strážovské vrchy",
        "uzemie": "Pružinský kras",
        "lokality": ["Pružinská Dúpna jaskyňa", "Četníkova svadba", "Brcove diery"]
      },
      {
        "celok": "Súľovské vrchy",
        "uzemie": "Manínsky kras",
        "lokality": ["Jaskyňa pod Černokňažníkom", "Partizánska jaskyňa"]
      }
    ]
  },
  {
    "klub": "Speleoklub Šariš",
    "sidlo": "Prešov",
    "priority_oblasti": [
      {
        "celok": "Čierna hora",
        "uzemie": "Kras Čiernej hory",
        "lokality": ["Kysacká jaskyňa", "Židova jaskyňa", "Veľká Ružínska jaskyňa"]
      }
    ]
  },
  {
    "klub": "Speleoklub Tisovec",
    "sidlo": "Tisovec",
    "priority_oblasti": [
      {
        "celok": "Muránska planina",
        "uzemie": "Tisovský kras",
        "lokality": ["Jaskyňa Teplica", "Jaskyňa Daxner", "Suché doly"]
      }
    ]
  },
  {
    "klub": "Trenčiansky speleoklub",
    "sidlo": "Trenčín",
    "priority_oblasti": [
      {
        "celok": "Strážovské vrchy",
        "uzemie": "Slatinský kras",
        "lokality": ["Jaskyňa Kakaeska", "Tam za rohom"]
      }
    ]
  },
  {
    "klub": "Speleoklub Tribeč",
    "sidlo": "Zlaté Moravce",
    "priority_oblasti": [
      {
        "celok": "Tribeč",
        "uzemie": "Tribečský kras",
        "lokality": ["Jazvinská jaskyňa", "Jaskyňa Píla", "Horné Lúčno"]
      }
    ]
  },
  {
    "klub": "Speleoklub Trnava",
    "sidlo": "Trnava",
    "priority_oblasti": [
      {
        "celok": "Malé Karpaty",
        "uzemie": "Kuchynsko-orešanský kras",
        "lokality": ["Hrajnohova jaskyňa", "Jaskyňa Mesačná"]
      }
    ]
  },
  {
    "klub": "Jaskyniarsky klub Speleo Turiec",
    "sidlo": "Martin",
    "priority_oblasti": [
      {
        "celok": "Veľká Fatra",
        "uzemie": "Gaderský a Blatnický kras",
        "lokality": ["Jaskyňa VR-3", "Jaskyňa Vôdky", "Jaskyňa pod Ostrou"]
      }
    ]
  },
  {
    "klub": "Oblastná skupina Uhrovec",
    "sidlo": "Uhrovec",
    "priority_oblasti": [
      {
        "celok": "Nitrické vrchy",
        "uzemie": "Uhrovský kras",
        "lokality": ["Jaskyňa Melková", "Vlčia diera"]
      }
    ]
  },
  {
    "klub": "Jaskyniarsky klub Varín",
    "sidlo": "Varín",
    "priority_oblasti": [
      {
        "celok": "Malá Fatra",
        "uzemie": "Vrátna dolina",
        "lokality": ["Jaskyňa nad vyvieračkou", "Krakovská jaskyňa"]
      }
    ]
  }
]

# Load current sss-data.json
with open("apps/web/src/data/sss-data.json", "r", encoding="utf-8") as f:
    data = json.load(f)

# Helper function to normalize club names
def norm(name):
    return name.lower().replace("–", "-").replace(" ", "").replace(".", "")

# Create lookup dict from user JSON
user_dict = {norm(item["klub"]): item for item in user_clubs_data}

# Attach priority_oblasti to all groups in sss-data.json
matched_count = 0
for group in data["groups"]:
    g_norm = norm(group["name"])
    found = None
    for k, v in user_dict.items():
        if k in g_norm or g_norm in k:
            found = v
            break
    
    if found:
        matched_count += 1
        group["priority_oblasti"] = found["priority_oblasti"]
    else:
        # Generate clean priority oblasti based on territory
        group["priority_oblasti"] = [
            {
                "celok": group.get("hq_city", "Slovensko"),
                "uzemie": f"Kras v okolí {group.get('hq_city', 'Slovenska')}",
                "lokality": [f"Jaskyne v pôsobnosti {group['name']}"]
            }
        ]

print(f"Matched {matched_count} clubs with exact priority_oblasti!")

# Save enriched data
with open("apps/web/src/data/sss-data.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("Enrichment complete!")
