/**
 * Checks career data against kariera's JSON Schema. The build checks against the copy `vp run
 * career:sync` keeps in src/data, so it fails on a career.json the site does not understand; the
 * sync checks a fresh export against the schema it copies along.
 */
import { Ajv2020 } from "ajv/dist/2020.js";

import keptCareerExportSchema from "../data/career-export.schema.json";
import type { CareerExport } from "./career-export.ts";

type CareerExportValidation = (data: unknown) => CareerExport;

function violation(instancePath: string, message: string | undefined): string {
  return `${instancePath === "" ? "/" : instancePath} ${message ?? "is invalid"}`;
}

/** Returns the data as a CareerExport; throws a list of every schema violation when it is not one. */
export function careerExportValidation(schema: object): CareerExportValidation {
  const isCareerExport = new Ajv2020({ allErrors: true }).compile<CareerExport>(schema);
  return (data) => {
    if (isCareerExport(data)) {
      return data;
    }
    const violations = (isCareerExport.errors ?? []).map(({ instancePath, message }) =>
      violation(instancePath, message),
    );
    throw new Error(
      `The career data does not follow the kept kariera schema:\n${violations.join("\n")}`,
    );
  };
}

export const validCareerExport = careerExportValidation(keptCareerExportSchema);
