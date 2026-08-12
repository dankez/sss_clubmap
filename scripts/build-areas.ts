import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import yaml from "js-yaml";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const areasDir = path.join(rootDir, "packages", "map-data", "areas");

interface AreaSeed {
  id: string;
  name: string;
  slug: string;
  description: string;
  cave_count: number;
  coordinates: [number, number][]; // GeoJSON [lng, lat] polygon ring
}

const seedAreas: AreaSeed[] = [
  {
    id: "area-slovensky-kras",
    name: "Slovenský kras",
    slug: "slovensky-kras",
    description: "Najväčšia krasová oblasť na Slovensku s výnimočnými planinami a vyše 1000 jaskyňami.",
    cave_count: 1000,
    coordinates: [
      [20.35, 48.65],
      [20.85, 48.68],
      [20.92, 48.52],
      [20.60, 48.48],
      [20.35, 48.55],
      [20.35, 48.65]
    ]
  },
  {
    id: "area-demanovska-dolina",
    name: "Demänovská dolina",
    slug: "demanovska-dolina",
    description: "Svetoznámy Demänovský jaskynný systém s dĺžkou vyše 43 km undergroundových priestorov.",
    cave_count: 300,
    coordinates: [
      [19.52, 49.03],
      [19.64, 49.03],
      [19.65, 48.95],
      [19.53, 48.95],
      [19.52, 49.03]
    ]
  },
  {
    id: "area-muranska-planina",
    name: "Muránska planina",
    slug: "muranska-planina",
    description: "Divoký kras s rozsiahlym systémom priepastí, jaskýň a vyvieračiek.",
    cave_count: 500,
    coordinates: [
      [19.90, 48.85],
      [20.18, 48.82],
      [20.15, 48.70],
      [19.88, 48.72],
      [19.90, 48.85]
    ]
  },
  {
    id: "area-slovensky-raj",
    name: "Slovenský raj",
    slug: "slovensky-raj",
    description: "Unikátne rokliny, Dobšinská ľadová jaskyňa a krasové planiny Glac a Pelc.",
    cave_count: 400,
    coordinates: [
      [20.18, 48.97],
      [20.45, 48.96],
      [20.42, 48.82],
      [20.16, 48.83],
      [20.18, 48.97]
    ]
  },
  {
    id: "area-strazovske-vrchy",
    name: "Strážovské vrchy",
    slug: "strazovske-vrchy",
    description: "Významný vápencovo-dolomitový kras Považia a Horného Nitria.",
    cave_count: 250,
    coordinates: [
      [18.30, 49.08],
      [18.65, 49.06],
      [18.60, 48.85],
      [18.28, 48.88],
      [18.30, 49.08]
    ]
  },
  {
    id: "area-mala-fatra",
    name: "Malá Fatra",
    slug: "mala-fatra",
    description: "Krasové útvary v kryštaliniku a obalových jednotkách Malej Fatry.",
    cave_count: 150,
    coordinates: [
      [18.90, 49.26],
      [19.22, 49.25],
      [19.18, 49.10],
      [18.88, 49.12],
      [18.90, 49.26]
    ]
  },
  {
    id: "area-cachticky-kras",
    name: "Čachtický kras",
    slug: "cachticky-kras",
    description: "Najsevernejší kras Malých Karpát s rozsiahlou Čachtickou jaskyňou.",
    cave_count: 80,
    coordinates: [
      [17.70, 48.78],
      [17.85, 48.77],
      [17.86, 48.67],
      [17.69, 48.68],
      [17.70, 48.78]
    ]
  }
];

function buildAreas(): void {
  if (!fs.existsSync(areasDir)) {
    fs.mkdirSync(areasDir, { recursive: true });
  }

  seedAreas.forEach((area) => {
    const targetDir = path.join(areasDir, area.slug);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const areaRecord = {
      id: area.id,
      name: area.name,
      slug: area.slug,
      description: area.description,
      aggregated_cave_count: {
        value: area.cave_count,
        estimated: true
      },
      polygon: {
        type: "Polygon",
        coordinates: [area.coordinates]
      },
      polygon_status: "estimated",
      created_at: "2026-08-12",
      updated_at: "2026-08-12"
    };

    const yamlPath = path.join(targetDir, "area.yaml");
    fs.writeFileSync(yamlPath, yaml.dump(areaRecord, { lineWidth: -1 }), "utf-8");
    console.log(`Generated area ${area.id} (${area.slug})`);
  });

  console.log(`\nSuccessfully created ${seedAreas.length} area records.`);
}

buildAreas();
