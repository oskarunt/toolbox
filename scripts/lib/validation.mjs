import { readJson, stableUnique } from "./files.mjs";
import { assertPublicUrl } from "./issues.mjs";

export async function validatorFor(schemaPath) {
  const schema = await readJson(schemaPath);
  const validate = (value) => {
    validate.errors = validateSchema(schema, value);
    return validate.errors.length === 0;
  };
  validate.errors = [];
  return { schema, validate };
}

function matchesType(type, value) {
  if (type === "null") return value === null;
  if (type === "array") return Array.isArray(value);
  if (type === "object") return value !== null && typeof value === "object" && !Array.isArray(value);
  if (type === "integer") return Number.isInteger(value);
  return typeof value === type;
}

function validateSchema(schema, value, instancePath = "") {
  const errors = [];
  if (schema.type) {
    const types = Array.isArray(schema.type) ? schema.type : [schema.type];
    if (!types.some((type) => matchesType(type, value))) {
      return [{ instancePath, message: `must be ${types.join(" or ")}` }];
    }
  }
  if (schema.enum && !schema.enum.includes(value)) {
    errors.push({ instancePath, message: `must be one of ${schema.enum.join(", ")}` });
  }
  if (value !== null && typeof value === "object" && !Array.isArray(value)) {
    for (const required of schema.required || []) {
      if (!Object.hasOwn(value, required)) {
        errors.push({ instancePath: `${instancePath}/${required}`, message: "is required" });
      }
    }
    if (schema.additionalProperties === false) {
      for (const key of Object.keys(value)) {
        if (!Object.hasOwn(schema.properties || {}, key)) {
          errors.push({ instancePath: `${instancePath}/${key}`, message: "is not allowed" });
        }
      }
    }
    for (const [key, childSchema] of Object.entries(schema.properties || {})) {
      if (Object.hasOwn(value, key)) {
        errors.push(...validateSchema(childSchema, value[key], `${instancePath}/${key}`));
      }
    }
  }
  if (Array.isArray(value) && schema.items) {
    value.forEach((item, index) => {
      errors.push(...validateSchema(schema.items, item, `${instancePath}/${index}`));
    });
  }
  return errors;
}

export function assertValid(validate, value, label) {
  if (!validate(value)) {
    const errors = validate.errors
      .map((error) => `${error.instancePath || "/"} ${error.message}`)
      .join("; ");
    throw new Error(`${label} failed schema validation: ${errors}`);
  }
}

function boundedText(value, label, maximum) {
  const result = value.replace(/\s+/g, " ").trim();
  if (!result) throw new Error(`${label} must not be empty.`);
  if (result.length > maximum) throw new Error(`${label} exceeds ${maximum} characters.`);
  return result;
}

function nullableUrl(value, label) {
  return value === null ? null : assertPublicUrl(value, label);
}

export function normalizeEnrichment(candidate) {
  return {
    ...candidate,
    name: boundedText(candidate.name, "name", 100),
    summary: boundedText(candidate.summary, "summary", 280),
    topics: stableUnique(
      candidate.topics.map((topic) => boundedText(topic.toLowerCase(), "topic", 40))
    ).slice(0, 8),
    languages: stableUnique(
      candidate.languages.map((language) => boundedText(language, "language", 40))
    ).slice(0, 8),
    license: candidate.license === null ? null : boundedText(candidate.license, "license", 50),
    links: {
      homepage: nullableUrl(candidate.links.homepage, "homepage"),
      documentation: nullableUrl(candidate.links.documentation, "documentation"),
      repository: nullableUrl(candidate.links.repository, "repository"),
      package: nullableUrl(candidate.links.package, "package")
    }
  };
}
