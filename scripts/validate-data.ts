#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import yaml from "js-yaml";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const mapDataDir = path.join(rootDir, "packages", "map-data");
const schemaDir = path.join(rootDir, "packages", "schema");

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);

function loadYaml(filePath: string): unknown {
  const content = fs.readFileSync(filePath, "utf-8");
  return yaml.load(content);
}

function loadSchema(fileName: string): object {
  return loadYaml(path.join(schemaDir, fileName)) as object;
}

const schemas: Record<string, object> = {
  group: loadSchema("group.schema.yaml"),
  area: loadSchema("area.schema.yaml"),
  relationship: loadSchema("relationship.schema.yaml"),
};

Object.values(schemas).forEach((schema) => ajv.addSchema(schema));

const validators: Record<string, ReturnType<typeof ajv.compile>> = {
  group: ajv.compile(schemas.group),
  area: ajv.compile(schemas.area),
  relationship: ajv.compile(schemas.relationship),
};

function detectKind(filePath: string): string | null {
  const base = path.basename(filePath).toLowerCase();
  if (base === "group.yaml" || base === "group.yml") return "group";
  if (base === "area.yaml" || base === "area.yml") return "area";
  if (
    base.startsWith("relationship") &&
    (base.endsWith(".yaml") || base.endsWith(".yml"))
  ) {
    return "relationship";
  }
  return null;
}

function findYamlFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...findYamlFiles(fullPath));
    } else if (
      entry.isFile() &&
      (entry.name.endsWith(".yaml") || entry.name.endsWith(".yml"))
    ) {
      files.push(fullPath);
    }
  }
  return files;
}

function main(): void {
  const files = findYamlFiles(mapDataDir);

  if (files.length === 0) {
    console.log(
      `No YAML data files found in ${path.relative(rootDir, mapDataDir)}.`
    );
    console.log("Schemas are ready; add data files to validate.");
    process.exit(0);
  }

  let hasErrors = false;

  for (const file of files) {
    const kind = detectKind(file);
    if (!kind) {
      console.error(
        `❌ ${path.relative(rootDir, file)}: Could not determine schema kind.`
      );
      hasErrors = true;
      continue;
    }

    const data = loadYaml(file);
    const validate = validators[kind];
    const valid = validate(data);

    if (!valid) {
      hasErrors = true;
      console.error(
        `❌ ${path.relative(rootDir, file)} failed ${kind} schema validation:`
      );
      for (const error of validate.errors || []) {
        const property = error.instancePath || "(root)";
        console.error(`   - ${property}: ${error.message}`);
      }
    } else {
      console.log(`✅ ${path.relative(rootDir, file)}`);
    }
  }

  if (hasErrors) {
    console.error("\nValidation failed. Fix the errors above before building.");
    process.exit(1);
  }

  console.log("\nAll data files validated successfully.");
}

main();
