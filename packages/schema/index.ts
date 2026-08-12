import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import yaml from "js-yaml";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const groupSchema = yaml.load(
  readFileSync(join(__dirname, "group.schema.yaml"), "utf-8")
) as object;

export const areaSchema = yaml.load(
  readFileSync(join(__dirname, "area.schema.yaml"), "utf-8")
) as object;

export const relationshipSchema = yaml.load(
  readFileSync(join(__dirname, "relationship.schema.yaml"), "utf-8")
) as object;

export const schemas = {
  group: groupSchema,
  area: areaSchema,
  relationship: relationshipSchema,
};
