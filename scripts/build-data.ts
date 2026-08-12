import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import yaml from "js-yaml";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const mapDataDir = path.join(rootDir, "packages", "map-data");
const targetJsonPath = path.join(rootDir, "apps", "web", "src", "data", "sss-data.json");

function loadYaml(filePath: string): unknown {
  return yaml.load(fs.readFileSync(filePath, "utf-8"));
}

function findYamlFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...findYamlFiles(fullPath));
    } else if (entry.isFile() && (entry.name.endsWith(".yaml") || entry.name.endsWith(".yml"))) {
      files.push(fullPath);
    }
  }
  return files;
}

function compileData(): void {
  const allFiles = findYamlFiles(mapDataDir);
  const groups: unknown[] = [];
  const areas: unknown[] = [];

  for (const file of allFiles) {
    const base = path.basename(file).toLowerCase();
    const data = loadYaml(file);
    if (base === "group.yaml" || base === "group.yml") {
      groups.push(data);
    } else if (base === "area.yaml" || base === "area.yml") {
      areas.push(data);
    }
  }

  const bundle = {
    generated_at: new Date().toISOString(),
    areas_count: areas.length,
    groups_count: groups.length,
    areas,
    groups
  };

  const targetDir = path.dirname(targetJsonPath);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  fs.writeFileSync(targetJsonPath, JSON.stringify(bundle, null, 2), "utf-8");
  console.log(`Compiled data bundle to ${path.relative(rootDir, targetJsonPath)}`);
  console.log(`Included ${areas.length} areas and ${groups.length} groups.`);
}

compileData();
