import json
import re

# Load user clubs priority data
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

# Definitive 24 Karst Areas of Slovakia
KARST_AREAS_24 = [
    {
        "id": "area-nizke-tatry-sever",
        "name": "Nízke Tatry – Sever (Demänovský a Jánsky kras)",
        "slug": "nizke-tatry-sever",
        "region_category": "tatry",
        "region_name": "Nízke Tatry",
        "description": "Najrozsiahlejšie jaskynné systémy Slovenska: Demänovský kras (43+ km), Kras Jánskej doliny (Zlomiská, Stanišovská), Krakova hoľa, Ohnište, Malužiná a Liptovská Teplička.",
        "aggregated_cave_count": {"value": 980, "estimated": False},
        "center": [19.60, 48.99],
        "major_caves": ["Demänovský jaskynný systém (43+ km)", "Jaskyňa Zlomísk (11 km)", "Stanišovská jaskyňa", "Jaskyňa Štefanová", "Starý hrad (hĺbka 432 m)", "Pustá jaskyňa", "Malužinská jaskyňa"],
        "match_keywords": ["demänov", "jánsk", "nicolaus", "teplička", "malužin", "štefanov", "zlomísk"]
    },
    {
        "id": "area-nizke-tatry-juh",
        "name": "Nízke Tatry – Juh (Ďumbiersky a Bystriansky kras)",
        "slug": "nizke-tatry-juh",
        "region_category": "tatry",
        "region_name": "Nízke Tatry",
        "description": "Južné svahy Ďumbierskych Tatier, Bystrianske podhorie a Horehronie: Jaskyňa mŕtvych netopierov (21.5 km), Bystrianska jaskyňa, Trangoška a Mýto pod Ďumbierom.",
        "aggregated_cave_count": {"value": 290, "estimated": False},
        "center": [19.60, 48.88],
        "major_caves": ["Jaskyňa mŕtvych netopierov (21.5 km)", "Bystrianska jaskyňa", "Trangošská jaskyňa", "Netopieria jaskyňa v Mýte", "Jaskyňa vo Vŕškoch"],
        "match_keywords": ["ďumbier", "brezno", "mŕtvych netopierov", "bystrian"]
    },
    {
        "id": "area-slovensky-kras-silica-plesivec",
        "name": "Slovenský kras (Silická a Plešivecká planina, Horný a Dolný vrch)",
        "slug": "slovensky-kras",
        "region_category": "kras",
        "region_name": "Slovenský kras",
        "description": "Svetové prírodné dedičstvo UNESCO: Silická planina, Plešivecká planina, Horný a Dolný vrch, Jasovská a Zádielska planina s viac ako 1 350 jaskyňami.",
        "aggregated_cave_count": {"value": 1350, "estimated": False},
        "center": [20.55, 48.60],
        "major_caves": ["Domica", "Gombasecká jaskyňa", "Krásnohorská jaskyňa", "Jasovská jaskyňa", "Silická ľadnica", "Ardovská jaskyňa", "Diviačia priepasť", "Zvonivá diera", "Drienovská jaskyňa", "Skalistý potok"],
        "match_keywords": ["slovenský kras", "silic", "plešiv", "ardov", "arachnos", "majku", "cassovia", "drienka", "minotaurus", "rožňav"]
    },
    {
        "id": "area-zapadne-tatry",
        "name": "Západné Tatry (Červené vrchy, Suchá dolina, Osobitá)",
        "slug": "zapadne-tatry",
        "region_category": "tatry",
        "region_name": "Západné Tatry",
        "description": "Vysokohorský kras Červených vrchov (Kresanica, Tichá dolina), Suchá dolina v Liptove a Kras Osobitej s Brestovskou jaskyňou.",
        "aggregated_cave_count": {"value": 240, "estimated": False},
        "center": [19.80, 49.22],
        "major_caves": ["Nová Kresanica", "Tichá jaskyňa (Piu)", "Brestovská jaskyňa", "Jaskyňa Dúpnica", "Borošková jaskyňa", "Priepastná v skálí"],
        "match_keywords": ["červené vrchy", "trnovec", "osobit", "suchá dolina"]
    },
    {
        "id": "area-vysoke-belianske-tatry",
        "name": "Vysoké a Belianske Tatry",
        "slug": "vysoke-belianske-tatry",
        "region_category": "tatry",
        "region_name": "Tatry",
        "description": "Vysokotatranský kras Javorinky a Mesačného tieňa (35.2 km), Beliansky kras (Belianska jaskyňa, Bujačí vrch, Alabastrová jaskyňa).",
        "aggregated_cave_count": {"value": 220, "estimated": False},
        "center": [20.20, 49.23],
        "major_caves": ["Mesačný tieň (35.2 km, hĺbka 451 m)", "Belianska jaskyňa", "Jaskyňa Javorinka (12.2 km)", "Alabastrová jaskyňa", "Hučivá diera"],
        "match_keywords": ["spišská belá", "beliansk", "javorink", "tatransk"]
    },
    {
        "id": "area-slovensky-raj",
        "name": "Slovenský raj",
        "slug": "slovensky-raj",
        "region_category": "raj",
        "region_name": "Slovenský raj",
        "description": "Krasová planina Glac, Geravy, tiesňavy Hornádu a gigantické podzemné sústavy Stratenskej jaskyne a Dobšinskej ľadovej jaskyne.",
        "aggregated_cave_count": {"value": 670, "estimated": False},
        "center": [20.35, 48.90],
        "major_caves": ["Stratenská jaskyňa – Psie diery (22 km)", "Dobšinská ľadová jaskyňa (UNESCO)", "Medvedia jaskyňa", "Duča", "Čertova diera"],
        "match_keywords": ["slovenský raj", "stratensk", "dobšin", "spišská nová ves"]
    },
    {
        "id": "area-muranska-planina",
        "name": "Muránska planina & Tisovský kras",
        "slug": "muranska-planina",
        "region_category": "raj",
        "region_name": "Muránska planina",
        "description": "Krasová planina s hlbokými kaňonmi: Bobačka (5.7 km), Tisovský kras (Teplica, Daxner), Šarkanica, Poľovnícka jaskyňa a Kľak.",
        "aggregated_cave_count": {"value": 420, "estimated": False},
        "center": [19.98, 48.75],
        "major_caves": ["Bobačka (5.7 km)", "Jaskyňa Teplica", "Jaskyňa Šarkanica", "Jaskyňa Daxner", "Poľovnícka jaskyňa", "Michňová"],
        "match_keywords": ["murán", "tisovec", "detva", "revúca"]
    },
    {
        "id": "area-male-karpaty-borinka-plavec",
        "name": "Malé Karpaty (Borinský a Plavecký kras)",
        "slug": "male-karpaty-borinka-plavec",
        "region_category": "karpaty",
        "region_name": "Malé Karpaty",
        "description": "Juhozápadné Malé Karpaty: Borinský kras (Pajštún, Veľké Prepadlé, Stará garda), Plavecký kras (Plavecká jaskyňa, Haviareň, Sedmička).",
        "aggregated_cave_count": {"value": 260, "estimated": False},
        "center": [17.15, 48.35],
        "major_caves": ["Veľké Prepadlé", "Stará garda", "Plavecká jaskyňa", "Jaskyňa Sedmička", "Jaskyňa Haviareň", "Borinská vyvieračka"],
        "match_keywords": ["bratislava", "plaveck", "borin"]
    },
    {
        "id": "area-male-karpaty-cachtice-smolenice",
        "name": "Malé Karpaty (Čachtický a Kuchynsko-orešanský kras)",
        "slug": "male-karpaty-cachtice-smolenice",
        "region_category": "karpaty",
        "region_name": "Malé Karpaty",
        "description": "Severovýchodné Malé Karpaty: Čachtický kras (Čachtická jaskyňa, Hladový prameň), Kuchynsko-orešanský a Smolenický kras (Driny, Hrajnoha, Mesačná).",
        "aggregated_cave_count": {"value": 130, "estimated": False},
        "center": [17.55, 48.65],
        "major_caves": ["Čachtická jaskyňa (4.1 km)", "Driny", "Hladový prameň", "Hrajnohova jaskyňa", "Jaskyňa Mesačná"],
        "match_keywords": ["čachtic", "trnava", "modra", "smolenic"]
    },
    {
        "id": "area-strazovske-vrchy-pruzina-mojtin",
        "name": "Strážovské vrchy (Pružinský, Mojtínsky a Slatinský kras)",
        "slug": "strazovske-vrchy",
        "region_category": "karpaty",
        "region_name": "Strážovské vrchy",
        "description": "Mojtínska krasová planina, Pružinský kras (Pružinská Dúpna, Četníkova svadba, Brcove diery), Slatinský kras a Zliechov.",
        "aggregated_cave_count": {"value": 270, "estimated": False},
        "center": [18.45, 49.00],
        "major_caves": ["Pružinská Dúpna jaskyňa", "Četníkova svadba", "Mojtínska priepastná jaskyňa", "Jaskyňa na Rúbani", "Jaskyňa Kakaeska"],
        "match_keywords": ["strážov", "pružin", "dubnic", "trenčín", "mojtín"]
    },
    {
        "id": "area-sulovske-vrchy",
        "name": "Súľovské vrchy & Manínsky kras",
        "slug": "sulovske-vrchy",
        "region_category": "karpaty",
        "region_name": "Súľov & Manín",
        "description": "Manínska a Kostolecká tiesňava, Súľovské skaly: Šarkania diera, Partizánska jaskyňa a Jaskyňa pod Černokňažníkom.",
        "aggregated_cave_count": {"value": 70, "estimated": False},
        "center": [18.58, 49.15],
        "major_caves": ["Šarkania diera v Súľove", "Partizánska jaskyňa", "Jaskyňa pod Černokňažníkom", "Kostolecká jaskyňa"],
        "match_keywords": ["súľov", "manín", "kostolec"]
    },
    {
        "id": "area-mala-fatra-vratna",
        "name": "Malá Fatra (Vrátna dolina, Tiesňavy a Rozsutce)",
        "slug": "mala-fatra",
        "region_category": "fatra",
        "region_name": "Malá Fatra",
        "description": "Krivánska Fatra: Vrátna dolina (Kryštálová jaskyňa, Medvedia jaskyňa, Jaskyňa nad vyvieračkou), Tiesňavy, Varín a Rozsutce.",
        "aggregated_cave_count": {"value": 110, "estimated": False},
        "center": [19.05, 49.22],
        "major_caves": ["Kryštálová jaskyňa", "Medvedia jaskyňa", "Jaskyňa nad vyvieračkou", "Krakovská jaskyňa", "Višňovská jaskyňa"],
        "match_keywords": ["terchov", "varín", "adama vallu", "vrátna"]
    },
    {
        "id": "area-velka-fatra-gader-harmanec",
        "name": "Veľká Fatra (Harmanecký, Gaderský a Beliansky kras)",
        "slug": "velka-fatra",
        "region_category": "fatra",
        "region_name": "Veľká Fatra",
        "description": "Harmanecká jaskyňa, Gaderský a Blatnický kras (Jaskyňa VR-3, Vôdky, pod Ostrou), Belianska dolina (Jaskyňa Žiarna 4), Tlstá a Mažarná.",
        "aggregated_cave_count": {"value": 560, "estimated": False},
        "center": [19.02, 48.94],
        "major_caves": ["Harmanecká jaskyňa", "Mažarná", "Jaskyňa VR-3", "Jaskyňa Vôdky", "Jaskyňa Žiarna 4", "Jaskyňa pod Ostrou", "Jaskyňa Izbica"],
        "match_keywords": ["turiec", "malá fatra v martine", "gader", "blatnic"]
    },
    {
        "id": "area-starohorske-vrchy",
        "name": "Starohorské vrchy (Starohorský a Španodolinský kras)",
        "slug": "starohorske-vrchy",
        "region_category": "fatra",
        "region_name": "Starohorské vrchy",
        "description": "Krasové ostrovy Starohorských vrchov: Môcovská jaskyňa, Jelenecká jaskyňa, Jelenská skala a Špania Dolina.",
        "aggregated_cave_count": {"value": 45, "estimated": False},
        "center": [19.12, 48.84],
        "major_caves": ["Môcovská jaskyňa", "Jelenecká jaskyňa", "Krasové vyvieračky v Starých Horách"],
        "match_keywords": ["starohor", "banská bystrica", "môcovsk"]
    },
    {
        "id": "area-chocske-vrchy",
        "name": "Chočské vrchy (Prosiecka a Kvačianska dolina, Lisková)",
        "slug": "chocske-vrchy",
        "region_category": "fatra",
        "region_name": "Chočské vrchy",
        "description": "Kaňony Prosieckej doliny (Prosiecka jaskyňa, Jaskyňa O-3), Chočské podhorie a Liskovská jaskyňa (4.2 km).",
        "aggregated_cave_count": {"value": 175, "estimated": False},
        "center": [19.45, 49.15],
        "major_caves": ["Liskovská jaskyňa (4.2 km)", "Prosiecka jaskyňa", "Jaskyňa O-3", "Helictitová jaskyňa", "Jaskyňa v Sestrči"],
        "match_keywords": ["choč", "lúčky", "prosieck", "ružomberok", "liskov"]
    },
    {
        "id": "area-pohorie-ziar-nitricke",
        "name": "Pohorie Žiar & Nitrické vrchy (Skleniansky a Uhrovský kras)",
        "slug": "pohorie-ziar-nitricke",
        "region_category": "karpaty",
        "region_name": "Žiar & Nitrické vrchy",
        "description": "Skleniansky kras v pohorí Žiar (Sonda Tepličky, Jaskyňa Cigánka) a Uhrovský kras v Nitrických vrchoch (Vestenická medvedia jaskyňa, Melková, Vlčia diera).",
        "aggregated_cave_count": {"value": 85, "estimated": False},
        "center": [18.65, 48.70],
        "major_caves": ["Vestenická medvedia jaskyňa", "Jaskyňa Melková", "Sonda Tepličky", "Jaskyňa Cigánka", "Vlčia diera"],
        "match_keywords": ["handlov", "uhrovec", "skleniansk", "nitrick"]
    },
    {
        "id": "area-cierna-hora-volovske",
        "name": "Čierna hora & Volovské vrchy (Kras Čiernej hory a Ružín)",
        "slug": "cierna-hora-volovske",
        "region_category": "vychod",
        "region_name": "Čierna hora",
        "description": "Kras Čiernej hory pri Hornáde: Kysacká jaskyňa, Židova jaskyňa, Veľká Ružínska jaskyňa, Antonova jaskyňa, Pokryvy a Poráčska dolina.",
        "aggregated_cave_count": {"value": 240, "estimated": False},
        "center": [21.08, 48.85],
        "major_caves": ["Veľká Ružínska jaskyňa", "Kysacká jaskyňa", "Židova jaskyňa", "Antonova jaskyňa", "Dúpna jaskyňa", "Šarkanova diera"],
        "match_keywords": ["šariš", "čierna hora", "kysak", "ružín"]
    },
    {
        "id": "area-branisko-bachuren",
        "name": "Branisko & Bachureň (Kras Lipoviec a Vyšného Slavkova)",
        "slug": "branisko-bachuren",
        "region_category": "vychod",
        "region_name": "Branisko & Šariš",
        "description": "Lačnovský kaňon a Lipovský kras: Jaskyňa Zlá diera (sprístupnená), Jaskyňa Chmeľová, Fosílny ponor a Komínová jaskyňa.",
        "aggregated_cave_count": {"value": 140, "estimated": False},
        "center": [20.92, 49.04],
        "major_caves": ["Jaskyňa Zlá diera", "Jaskyňa Chmeľová", "Fosílny ponor", "Lačnovská jaskyňa", "Komínová jaskyňa"],
        "match_keywords": ["prešov", "zlá diera", "lipovc", "branisko", "slavkov"]
    },
    {
        "id": "area-revucka-driencany",
        "name": "Revúcka vrchovina (Drienčanský kras a Hrádok)",
        "slug": "revucka-driencany",
        "region_category": "kras",
        "region_name": "Drienčanský kras",
        "description": "Drienčanský kras na styku s Rimavskou kotlinou (Veľká Drienčanská jaskyňa, Jaskyňa Nad Kadlubom), Hrádocký kras (Ochtinská aragonitová jaskyňa UNESCO).",
        "aggregated_cave_count": {"value": 190, "estimated": False},
        "center": [20.15, 48.55],
        "major_caves": ["Ochtinská aragonitová jaskyňa (UNESCO)", "Veľká Drienčanská jaskyňa", "Jaskyňa Nad Kadlubom", "Jaskyňa Podbanište", "Praslen"],
        "match_keywords": ["rimavská sobota", "drienčan", "ochtinsk"]
    },
    {
        "id": "area-tribec-povazie",
        "name": "Tribeč & Považský Inovec (Tribečský a Selecký kras)",
        "slug": "tribec-povazie",
        "region_category": "karpaty",
        "region_name": "Tribeč & Považský Inovec",
        "description": "Tribečský kras (Jazvinská jaskyňa, Jaskyňa Píla, Horné Lúčno, Svoradova jaskyňa) a Selecký kras v Považskom Inovci (Jaskyňa Pod Holým kameňom, Čertova pec).",
        "aggregated_cave_count": {"value": 95, "estimated": False},
        "center": [18.15, 48.40],
        "major_caves": ["Jazvinská jaskyňa", "Jaskyňa Píla", "Svoradova jaskyňa", "Jaskyňa Pod Holým kameňom", "Čertova pec"],
        "match_keywords": ["tribeč", "zlaté moravce", "inovec", "selec", "nitra"]
    },
    {
        "id": "area-orava-kralovany",
        "name": "Oravská vrchovina & Kraľoviansky meander",
        "slug": "orava-kralovany",
        "region_category": "fatra",
        "region_name": "Oravská vrchovina",
        "description": "Kraľoviansky meander (Lom Kraľovany II, Jaskyňa Ľudmila, Mišova priepasť) a kras Ostrej a Tupej skaly vo Vyšnom Kubíne.",
        "aggregated_cave_count": {"value": 65, "estimated": False},
        "center": [19.18, 49.18],
        "major_caves": ["Jaskyňa Ľudmila", "Mišova priepasť", "Jaskyňa v Ostrej skale", "Lom Kraľovany II"],
        "match_keywords": ["kraľovany", "aragonit", "kubín"]
    },
    {
        "id": "area-pieniny-bradlo",
        "name": "Pieniny & Bradlové pásmo",
        "slug": "pieniny-bradlo",
        "region_category": "vychod",
        "region_name": "Pieniny & Bradlá",
        "description": "Pieninský kras (Jaskyňa Aksamitka, Haligovské skaly, Zbojnícka jaskyňa), Vršatecké bradlá, Litmanová a Humenské vrchy.",
        "aggregated_cave_count": {"value": 115, "estimated": False},
        "center": [20.45, 49.38],
        "major_caves": ["Jaskyňa Aksamitka", "Zbojnícka jaskyňa v Haligovciach", "Vršatecká priepasť", "Brekovská jaskyňa"],
        "match_keywords": ["pienin", "aksamitk", "haligov", "vršatec"]
    },
    {
        "id": "area-horehronie-podolie",
        "name": "Horehronské podolie & Bystrianske podhorie",
        "slug": "horehronie-podolie",
        "region_category": "tatry",
        "region_name": "Horehronie",
        "description": "Krasové vyvieračky, ponory a jaskyne Horehronského podolia a Bystrianskeho podhoria (Jaskyňa vo Vŕškoch, Bystriansky závrt, Potôčky).",
        "aggregated_cave_count": {"value": 55, "estimated": False},
        "center": [19.70, 48.82],
        "major_caves": ["Jaskyňa vo Vŕškoch", "Bystriansky závrt", "Potôčky", "Valaská vyvieračka"],
        "match_keywords": ["podolie", "podhorie", "potôčky"]
    },
    {
        "id": "area-travertiny-bojnice-spis",
        "name": "Travertínové krasové oblasti (Bojnice a Dreveník)",
        "slug": "travertiny-bojnice-spis",
        "region_category": "kras",
        "region_name": "Travertíny",
        "description": "Travertínové krasové javy: Prepoštská jaskyňa a Hradná jaskyňa v Bojniciach, travertínová kopa Dreveník pri Spišskom Podhradí a Bešeňová.",
        "aggregated_cave_count": {"value": 75, "estimated": False},
        "center": [18.58, 48.78],
        "major_caves": ["Prepoštská jaskyňa (Bojnice)", "Jaskyňa pod hradom Bojnice", "Hradná jaskyňa na Dreveníku", "Bešeňovské travertíny"],
        "match_keywords": ["bojnic", "dreveník", "bešeňov", "travertín"]
    }
]

# Load current sss-data.json
with open("apps/web/src/data/sss-data.json", "r", encoding="utf-8") as f:
    data = json.load(f)

# Build normalized helper
def norm(text):
    return re.sub(r'[^a-zA-Z0-9]', '', (text or '').lower())

# Match priority_oblasti to all 53 groups
user_dict = {norm(item["klub"]): item for item in user_clubs_data}

# Assign priority_oblasti and determine primary Karst Area for each group
for g in data["groups"]:
    g_norm = norm(g["name"])
    found_user_club = None
    for k, v in user_dict.items():
        if k in g_norm or g_norm in k:
            found_user_club = v
            break

    if found_user_club:
        g["priority_oblasti"] = found_user_club["priority_oblasti"]
    else:
        # Fallback priority area based on city
        g["priority_oblasti"] = [
            {
                "celok": g.get("hq_city", "Slovensko"),
                "uzemie": f"Kras v regióne {g.get('hq_city', 'Slovensko')}",
                "lokality": [f"Prieskumné jaskyne v okolí {g.get('hq_city', 'Slovenska')}"]
            }
        ]

# Now for each group, find its exact primary Karst Area ID based on priority_oblasti!
for g in data["groups"]:
    p_oblasti = g.get("priority_oblasti", [])
    p_text = " ".join([f"{p.get('celok', '')} {p.get('uzemie', '')} {' '.join(p.get('lokality', []))}" for p in p_oblasti]).lower()
    p_text += " " + g["name"].lower() + " " + (g.get("hq_city") or "").lower()

    matched_area_id = None
    
    # Specific targeted mappings
    if "nicolaus" in g["name"].lower():
        matched_area_id = "area-nizke-tatry-sever"
    elif "demänovsk" in g["name"].lower():
        matched_area_id = "area-nizke-tatry-sever"
    elif "liptovský mikuláš" in g["name"].lower():
        matched_area_id = "area-nizke-tatry-sever"
    elif "liptovská teplička" in g["name"].lower():
        matched_area_id = "area-nizke-tatry-sever"
    elif "malužin" in p_text or "červené vrchy" in g["name"].lower():
        matched_area_id = "area-zapadne-tatry"
    elif "trnovec" in g["name"].lower():
        matched_area_id = "area-zapadne-tatry"
    elif "orava" in g["name"].lower():
        matched_area_id = "area-zapadne-tatry"
    elif "spišská belá" in g["name"].lower():
        matched_area_id = "area-vysoke-belianske-tatry"
    elif "aragonit" in g["name"].lower() or "kraľovany" in g["name"].lower():
        matched_area_id = "area-orava-kralovany"
    elif "adama vallu" in g["name"].lower() or "varín" in g["name"].lower() or "terchov" in g["name"].lower():
        matched_area_id = "area-mala-fatra-vratna"
    elif "banská bystrica" in g["name"].lower():
        matched_area_id = "area-starohorske-vrchy"
    elif "turiec" in g["name"].lower() or "malá fatra v martine" in g["name"].lower():
        matched_area_id = "area-velka-fatra-gader-harmanec"
    elif "chočsk" in g["name"].lower() or "ružomberok" in g["name"].lower():
        matched_area_id = "area-chocske-vrchy"
    elif "ďumbier" in g["name"].lower():
        matched_area_id = "area-nizke-tatry-juh"
    elif "brezno" in g["name"].lower():
        matched_area_id = "area-horehronie-podolie"
    elif "muránsk" in g["name"].lower() or "detva" in g["name"].lower():
        matched_area_id = "area-muranska-planina"
    elif "tisovec" in g["name"].lower():
        matched_area_id = "area-muranska-planina"
    elif "slovenský raj" in g["name"].lower() or "spišská nová ves" in g["name"].lower():
        matched_area_id = "area-slovensky-raj"
    elif "čachtic" in g["name"].lower():
        matched_area_id = "area-male-karpaty-cachtice-smolenice"
    elif "trnava" in g["name"].lower() or "modra" in g["name"].lower():
        matched_area_id = "area-male-karpaty-cachtice-smolenice"
    elif "bratislava" in g["name"].lower():
        matched_area_id = "area-male-karpaty-borinka-plavec"
    elif "plaveck" in g["name"].lower():
        matched_area_id = "area-male-karpaty-borinka-plavec"
    elif "strážov" in g["name"].lower() or "pružin" in g["name"].lower() or "dubnic" in g["name"].lower() or "trenčín" in g["name"].lower():
        matched_area_id = "area-strazovske-vrchy-pruzina-mojtin"
    elif "handlov" in g["name"].lower() or "uhrovec" in g["name"].lower():
        matched_area_id = "area-pohorie-ziar-nitricke"
    elif "tribeč" in g["name"].lower() or "inovec" in g["name"].lower() or "selec" in g["name"].lower() or "nitra" in g["name"].lower():
        matched_area_id = "area-tribec-povazie"
    elif "šariš" in g["name"].lower():
        matched_area_id = "area-cierna-hora-volovske"
    elif "prešov" in g["name"].lower():
        matched_area_id = "area-branisko-bachuren"
    elif "rimavsk" in g["name"].lower():
        matched_area_id = "area-revucka-driencany"
    else:
        # Search against keywords
        for ka in KARST_AREAS_24:
            if any(kw in p_text for kw in ka["match_keywords"]):
                matched_area_id = ka["id"]
                break

    if not matched_area_id:
        matched_area_id = "area-slovensky-kras-silica-plesivec"

    g["area_relationships"] = [{"area_id": matched_area_id, "role": "primary_field_activity"}]

# Build updated areas list with assigned groups
built_areas = []
for ka in KARST_AREAS_24:
    aid = ka["id"]
    assigned_gids = [g["id"] for g in data["groups"] if any(rel["area_id"] == aid for rel in g.get("area_relationships", []))]
    
    lng, lat = ka["center"]
    delta_x = 0.15
    delta_y = 0.10
    coords = [
        [
            [round(lng - delta_x, 5), round(lat - delta_y, 5)],
            [round(lng + delta_x, 5), round(lat - delta_y, 5)],
            [round(lng + delta_x, 5), round(lat + delta_y, 5)],
            [round(lng - delta_x, 5), round(lat + delta_y, 5)],
            [round(lng - delta_x, 5), round(lat - delta_y, 5)]
        ]
    ]

    area_obj = {
        "id": aid,
        "name": ka["name"],
        "slug": ka["slug"],
        "region_category": ka["region_category"],
        "region_name": ka["region_name"],
        "description": ka["description"],
        "aggregated_cave_count": ka["aggregated_cave_count"],
        "major_caves": ka["major_caves"],
        "groups": assigned_gids,
        "polygon": {
            "type": "Polygon",
            "coordinates": coords
        },
        "polygon_status": "scientific_hochmuth"
    }
    built_areas.append(area_obj)

data["areas_count"] = len(built_areas)
data["areas"] = built_areas

# Save to sss-data.json
with open("apps/web/src/data/sss-data.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"SUCCESS: Built {len(built_areas)} scientific karst areas. Speleoklub Nicolaus linked to: {[rel['area_id'] for g in data['groups'] if 'nicolaus' in g['name'].lower() for rel in g['area_relationships']]}")
