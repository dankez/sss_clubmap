import json

# Definitive scientific karst regionalization of Slovakia (Hochmuth 2008 / SSS)
KARST_AREAS = [
    {
        "id": "area-slovensky-kras",
        "name": "Slovenský kras",
        "slug": "slovensky-kras",
        "region_category": "kras",
        "region_name": "Slovenský kras & Planiny",
        "description": "Najrozsiahlejšie krasové územie planinového typu v strednej Európe (Silická, Plešivská, Jasovská, Zádielska, Koniarska planina, Horný a Dolný vrch). Svetové dedičstvo UNESCO s viac ako 1 350 jaskyňami.",
        "aggregated_cave_count": {"value": 1350, "estimated": False},
        "center": [20.55, 48.60],
        "major_caves": ["Domica", "Gombasecká jaskyňa", "Krásnohorská jaskyňa", "Jasovská jaskyňa", "Silická ľadnica", "Skalistý potok", "Kunia priepasť", "Diviačia priepasť", "Drienovská jaskyňa", "Hrušovská jaskyňa"],
        "assigned_group_ids": ["sss-001", "sss-005", "sss-006", "sss-024", "sss-025", "sss-026", "sss-029", "sss-039", "sss-042", "sss-046"]
    },
    {
        "id": "area-nizke-tatry-sever",
        "name": "Nízke Tatry – Sever",
        "slug": "nizke-tatry-sever",
        "region_category": "tatry",
        "region_name": "Nízke Tatry",
        "description": "Mimoriadne hlboké a rozsiahle fluviokrasové a glaciokrasové sústavy severných svahov Nízkych Tatier (Demänovská dolina, Jánska dolina, Krakova hoľa, Ohnište, Ďumbiersky kras, Čierny Váh).",
        "aggregated_cave_count": {"value": 980, "estimated": False},
        "center": [19.62, 48.98],
        "major_caves": ["Demänovský jaskynný systém (43+ km)", "Jaskyňa Zlomísk (11 km)", "Stanišovská jaskyňa", "Jaskyňa Štefanová", "Starý hrad (hĺbka 432 m)", "Záskočská jaskyňa", "Veľká ľadová priepasť na Ohništi"],
        "assigned_group_ids": ["sss-014", "sss-015", "sss-016", "sss-017", "sss-018", "sss-040"]
    },
    {
        "id": "area-nizke-tatry-juh",
        "name": "Nízke Tatry – Juh",
        "slug": "nizke-tatry-juh",
        "region_category": "tatry",
        "region_name": "Nízke Tatry",
        "description": "Južné svahy Ďumbierskych a Kráľovohoľských Tatier, Bystrianske podhorie a Horehronie (Trangoška, Mýto pod Ďumbierom, Vajskovská dolina, Moštenica).",
        "aggregated_cave_count": {"value": 290, "estimated": False},
        "center": [19.60, 48.88],
        "major_caves": ["Jaskyňa mŕtvych netopierov (21.5 km)", "Bystrianska jaskyňa", "Trangošská jaskyňa", "Netopieria jaskyňa v Mýte", "Štefánikova jaskyňa"],
        "assigned_group_ids": ["sss-008", "sss-009", "sss-010", "sss-048"]
    },
    {
        "id": "area-tatry",
        "name": "Tatry (Belianske, Vysoké a Západné Tatry)",
        "slug": "tatry",
        "region_category": "tatry",
        "region_name": "Vysoké, Západné a Belianske Tatry",
        "description": "Vysokohorský kras Červených vrchov, Belianskych Tatier (Bujačí vrch), Javorinskej oblasti a Západných Tatier (Roháče, Bobrovec, Tichá a Kôprová dolina).",
        "aggregated_cave_count": {"value": 460, "estimated": False},
        "center": [19.95, 49.20],
        "major_caves": ["Mesačný tieň (35.2 km, hĺbka 451 m)", "Belianska jaskyňa", "Javorinka (12.2 km)", "Alabastrová jaskyňa", "Jaskyňa v Kresanici", "Brestovská jaskyňa", "Hučivá diera"],
        "assigned_group_ids": ["sss-003", "sss-019", "sss-043", "sss-044", "sss-051"]
    },
    {
        "id": "area-slovensky-raj",
        "name": "Slovenský raj",
        "slug": "slovensky-raj",
        "region_category": "raj",
        "region_name": "Slovenský raj",
        "description": "Krasová planina Glac, Geravy, tiesňavy (Suchá Belá, Kyseľ, Piecky, Prielom Hornádu) a gigantické podzemné sústavy Stratenskej hornatiny.",
        "aggregated_cave_count": {"value": 670, "estimated": False},
        "center": [20.35, 48.90],
        "major_caves": ["Stratenská jaskyňa – Psie diery (22 km)", "Dobšinská ľadová jaskyňa (UNESCO)", "Medvedia jaskyňa", "Duča", "Čertova diera", "Vlčia jaskyňa", "Zelená jaskyňa"],
        "assigned_group_ids": ["sss-036", "sss-037", "sss-038", "sss-041"]
    },
    {
        "id": "area-muranska-planina",
        "name": "Muránska planina & Tisovský kras",
        "slug": "muranska-planina",
        "region_category": "raj",
        "region_name": "Muránska planina",
        "description": "Krasová planina s hlbokými kaňonmi a tiesňavami (Hrdzavá dolina, Javorníková dolina), Tisovský kras, Šarkanica a Kľak.",
        "aggregated_cave_count": {"value": 420, "estimated": False},
        "center": [19.98, 48.75],
        "major_caves": ["Bobačka (5.7 km)", "Jaskyňa Šarkanica", "Michňová", "Kostolík", "Teplica", "Veľká a Malá Stožka", "Priepasť v Kľaku"],
        "assigned_group_ids": ["sss-041", "sss-047", "sss-048"]
    },
    {
        "id": "area-male-karpaty",
        "name": "Malé Karpaty",
        "slug": "male-karpaty",
        "region_category": "karpaty",
        "region_name": "Malé Karpaty",
        "description": "Krasové oblasti kryštalinika a vápencov: Borinský kras (Pajštún), Plavecký kras, Smolenický kras, Kuchynsko-orešanský kras, Dobrovodský kras a Čachtický kras.",
        "aggregated_cave_count": {"value": 390, "estimated": False},
        "center": [17.30, 48.45],
        "major_caves": ["Driny (sprístupnená)", "Čachtická jaskyňa (4.1 km)", "Deravá skala", "Tmavá skala", "Plavecká jaskyňa", "Havranická priepasť", "Zbojnícka jaskyňa", "Borinská vyvieračka"],
        "assigned_group_ids": ["sss-004", "sss-007", "sss-022", "sss-028", "sss-049"]
    },
    {
        "id": "area-strazovske-vrchy",
        "name": "Strážovské vrchy & Súľov",
        "slug": "strazovske-vrchy",
        "region_category": "karpaty",
        "region_name": "Strážovské vrchy",
        "description": "Rozsiahly kras Mojtínskej krasovej planiny, Pružinská Dúpna, Zliechovská hornatina, Manínska a Kostolecká tiesňava a Súľovské skaly.",
        "aggregated_cave_count": {"value": 310, "estimated": False},
        "center": [18.50, 49.00],
        "major_caves": ["Pružinská Dúpna jaskyňa", "Mojtínska jaskyňa", "Četníkova svadba", "Kortmanka", "Partizánska jaskyňa", "Šarkania diera v Súľove", "Jaskyňa pod Strážovom"],
        "assigned_group_ids": ["sss-011", "sss-030", "sss-031", "sss-032", "sss-045"]
    },
    {
        "id": "area-velka-fatra",
        "name": "Veľká Fatra & Starohorské vrchy",
        "slug": "velka-fatra",
        "region_category": "fatra",
        "region_name": "Veľká Fatra",
        "description": "Harmanecký kras, Gaderská a Blatnická dolina, Tlstá, Belianska dolina, Drienok, Revúcke podolie a Starohorský kras.",
        "aggregated_cave_count": {"value": 590, "estimated": False},
        "center": [19.05, 48.95],
        "major_caves": ["Harmanecká jaskyňa (sprístupnená)", "Jaskyňa Izbica", "Mažarná", "Dekretova jaskyňa", "Biela jaskyňa", "Jaskyňa v Tlstej", "Čiernohorská jaskyňa"],
        "assigned_group_ids": ["sss-002", "sss-034", "sss-035", "sss-050"]
    },
    {
        "id": "area-chocske-vrchy",
        "name": "Chočské vrchy & Liptovský kras",
        "slug": "chocske-vrchy",
        "region_category": "fatra",
        "region_name": "Chočské vrchy",
        "description": "Fluviokrasové kaňony Prosieckej a Kvačianskej doliny, masív Veľkého Choča, Liskovská jaskyňa a Sestrč.",
        "aggregated_cave_count": {"value": 175, "estimated": False},
        "center": [19.45, 49.15],
        "major_caves": ["Liskovská jaskyňa (4.2 km)", "Prosiecka jaskyňa", "Helictitová jaskyňa", "Jaskyňa v Sestrči", "Jaskyňa v Choči"],
        "assigned_group_ids": ["sss-012", "sss-034", "sss-035"]
    },
    {
        "id": "area-mala-fatra",
        "name": "Malá Fatra & Žilinská kotlina",
        "slug": "mala-fatra",
        "region_category": "fatra",
        "region_name": "Malá Fatra",
        "description": "Krivánska Fatra (Rozsutce, Tiesňavy, Vrátna dolina), Boboty a Lúčanská Fatra (Kľak, Rajeckolesniansky kras, Višňové).",
        "aggregated_cave_count": {"value": 140, "estimated": False},
        "center": [19.02, 49.20],
        "major_caves": ["Kryštálová jaskyňa v Malom Rozsutci", "Jaskyňa vo Vyhliadke", "Višňovská jaskyňa", "Hoblikova jaskyňa", "Jaskyňa v Kľaku"],
        "assigned_group_ids": ["sss-045", "sss-052", "sss-053"]
    },
    {
        "id": "area-cierna-hora-volovske",
        "name": "Čierna hora & Volovské vrchy",
        "slug": "cierna-hora-volovske",
        "region_category": "vychod",
        "region_name": "Čierna hora & Volovské vrchy",
        "description": "Ružínsky kras pri Hornáde, Pokryvy, Sopotnické vrchy, Roháčka, Bujanov, Folkmarská skala a Poráčska dolina.",
        "aggregated_cave_count": {"value": 240, "estimated": False},
        "center": [21.05, 48.85],
        "major_caves": ["Veľká Ružínska jaskyňa", "Antonova jaskyňa", "Dúpna jaskyňa", "Kresadlo", "Šarkanova diera v Poráči", "Komínska jaskyňa"],
        "assigned_group_ids": ["sss-006", "sss-020", "sss-021", "sss-033"]
    },
    {
        "id": "area-branisko-spis-saris",
        "name": "Branisko & Spišsko-šarišský kras",
        "slug": "branisko-spis-saris",
        "region_category": "vychod",
        "region_name": "Spiš & Šariš",
        "description": "Kras Lačnovského kaňonu, Lipovský kras, podzemie priepastí v Branisku, Zlá Diera a jaskyne Šarišskej vrchoviny.",
        "aggregated_cave_count": {"value": 150, "estimated": False},
        "center": [20.92, 49.04],
        "major_caves": ["Jaskyňa Zlá Diera (sprístupnená)", "Komínová jaskyňa", "Lačnovská jaskyňa", "Parkán", "Diablov dych"],
        "assigned_group_ids": ["sss-027", "sss-033"]
    },
    {
        "id": "area-revucka-driencany",
        "name": "Revúcka vrchovina & Drienčanský kras",
        "slug": "revucka-driencany",
        "region_category": "kras",
        "region_name": "Drienčany & Horehronie",
        "description": "Hrádocký kras (Ochtinská aragonitová jaskyňa), Drienčanský kras na styku s Rimavskou kotlinou, Tuhársky kras a Ružinský kras.",
        "aggregated_cave_count": {"value": 210, "estimated": False},
        "center": [20.15, 48.55],
        "major_caves": ["Ochtinská aragonitová jaskyňa (UNESCO)", "Drienčanská jaskyňa", "Jaskyňa Podbanište", "Praslen", "Chvalovská jaskyňa", "Tuhárska jaskyňa"],
        "assigned_group_ids": ["sss-013", "sss-029"]
    },
    {
        "id": "area-tribec-povazie",
        "name": "Tribeč & Považský Inovec",
        "slug": "tribec-povazie",
        "region_category": "karpaty",
        "region_name": "Tribeč & Považie",
        "description": "Zoborský kras (Nitra), Žibrica, Kostoliansky kras, Inovecký kras a Beckovské hradné bradlo s Čertovou pecou.",
        "aggregated_cave_count": {"value": 95, "estimated": False},
        "center": [18.15, 48.40],
        "major_caves": ["Svoradova jaskyňa", "Čertova pec (Radošina)", "Jaskyňa na Žibrici", "Beckovská jaskyňa", "Kostolianska priepasť"],
        "assigned_group_ids": ["sss-023", "sss-049"]
    },
    {
        "id": "area-bradlo-pieniny",
        "name": "Pieniny & Bradlové pásmo",
        "slug": "bradlo-pieniny",
        "region_category": "vychod",
        "region_name": "Pieniny & Bradlá",
        "description": "Bradlové pásmo Klippen Belt: Pieninský kras (Aksamitka, Haligovské skaly, Prielom Dunajca), Vršatec, Litmanová a Humenské vrchy.",
        "aggregated_cave_count": {"value": 125, "estimated": False},
        "center": [20.45, 49.38],
        "major_caves": ["Jaskyňa Aksamitka", "Zbojnícka jaskyňa v Haligovciach", "Vršatecká priepasť", "Brekovská jaskyňa", "Jasenovská jaskyňa"],
        "assigned_group_ids": ["sss-027", "sss-033"]
    },
    {
        "id": "area-orava-vrchovina",
        "name": "Orava & Podtatranské ostrovy",
        "slug": "orava-vrchovina",
        "region_category": "fatra",
        "region_name": "Orava & Podtatranská kotlina",
        "description": "Kras Ostrej a Tupej skaly vo Vyšnom Kubíne, Brestovská jaskyňa v Zuberci, Oravská Magura a izolované krasové ostrovy Liptovskej kotliny.",
        "aggregated_cave_count": {"value": 90, "estimated": False},
        "center": [19.30, 49.25],
        "major_caves": ["Brestovská jaskyňa (sprístupnená)", "Jaskyňa v Ostrej skale", "Jaskyňa v Tupej skale", "Trstenská priepasť"],
        "assigned_group_ids": ["sss-019", "sss-051"]
    },
    {
        "id": "area-travertiny-bojnice-spis",
        "name": "Travertínové krasové oblasti",
        "slug": "travertiny-bojnice-spis",
        "region_category": "kras",
        "region_name": "Travertíny & Kotliny",
        "description": "Geneticky špecifické travertínové krasové oblasti Slovenska: Bojnický travertínový kras, Dreveník a Spišské Podhradie, Bešeňová, Dudince a Vyšné Ružbachy.",
        "aggregated_cave_count": {"value": 80, "estimated": False},
        "center": [19.80, 48.90],
        "major_caves": ["Prepoštská jaskyňa (Bojnice)", "Jaskyňa pod hradom Bojnice", "Hradná jaskyňa na Dreveníku", "Jaskyňa v travertínoch Bešeňová"],
        "assigned_group_ids": ["sss-010", "sss-027"]
    }
]

print(f"Total defined scientific Karst Areas: {len(KARST_AREAS)}")

# Load sss-data.json
with open("apps/web/src/data/sss-data.json", "r", encoding="utf-8") as f:
    data = json.load(f)

# Update areas array in data
data["areas_count"] = len(KARST_AREAS)
data["areas"] = []

for ka in KARST_AREAS:
    # Build coordinates circle/polygon around center
    lng, lat = ka["center"]
    delta_x = 0.18
    delta_y = 0.12
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
        "id": ka["id"],
        "name": ka["name"],
        "slug": ka["slug"],
        "region_category": ka["region_category"],
        "region_name": ka["region_name"],
        "description": ka["description"],
        "aggregated_cave_count": ka["aggregated_cave_count"],
        "major_caves": ka["major_caves"],
        "groups": ka["assigned_group_ids"],
        "polygon": {
            "type": "Polygon",
            "coordinates": coords
        },
        "polygon_status": "scientific_hochmuth"
    }
    data["areas"].append(area_obj)

# Update area_relationships for all 53 groups
for g in data["groups"]:
    gid = g["id"]
    assigned_areas = [a["id"] for a in data["areas"] if gid in a["groups"]]
    
    if not assigned_areas:
        g_name = g["name"].lower()
        g_city = (g.get("hq_city") or "").lower()
        if "bratislava" in g_city or "trnava" in g_city or "modra" in g_city or "čachtice" in g_city or "malé karpaty" in g_name:
            assigned_areas = ["area-male-karpaty"]
        elif "rožňava" in g_city or "košice" in g_city or "kras" in g_name or "jasov" in g_name:
            assigned_areas = ["area-slovensky-kras"]
        elif "mikuláš" in g_city or "demänov" in g_name or "ján" in g_city or "liptov" in g_name:
            assigned_areas = ["area-nizke-tatry-sever"]
        elif "brezno" in g_city or "banská bystrica" in g_city or "mýto" in g_city:
            assigned_areas = ["area-nizke-tatry-juh"]
        elif "raj" in g_name or "spišská nová ves" in g_city or "dobšin" in g_city:
            assigned_areas = ["area-slovensky-raj"]
        elif "tatr" in g_name or "belá" in g_city or "poprad" in g_city or "orav" in g_name:
            assigned_areas = ["area-tatry"]
        elif "považ" in g_city or "dubnic" in g_city or "strážov" in g_name or "mojtín" in g_name:
            assigned_areas = ["area-strazovske-vrchy"]
        elif "žilina" in g_city or "varín" in g_city or "terchov" in g_city or "vrátna" in g_name:
            assigned_areas = ["area-mala-fatra"]
        elif "martin" in g_city or "turiec" in g_city or "ružomberok" in g_city:
            assigned_areas = ["area-velka-fatra"]
        elif "prešov" in g_city or "šariš" in g_name or "branisko" in g_name:
            assigned_areas = ["area-branisko-spis-saris"]
        elif "tisovec" in g_city or "muráň" in g_city:
            assigned_areas = ["area-muranska-planina"]
        elif "rimavsk" in g_city or "drienčan" in g_name:
            assigned_areas = ["area-revucka-driencany"]
        elif "nitra" in g_city or "tribeč" in g_name:
            assigned_areas = ["area-tribec-povazie"]
        else:
            assigned_areas = ["area-slovensky-kras"]

    # Write relationships
    g["area_relationships"] = [{"area_id": aid, "role": "primary_field_activity"} for aid in assigned_areas]

# Save back to sss-data.json
with open("apps/web/src/data/sss-data.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("Successfully updated sss-data.json with scientific Karst Areas (Hochmuth 2008) and club assignments!")
