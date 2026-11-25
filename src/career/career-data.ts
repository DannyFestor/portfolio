/**
 * The site's career, from the career.json `vp run career:sync` writes; the build fails when it is
 * invalid.
 */
import careerJson from "../data/career.json";
import { careerFrom } from "./career.ts";

export const CAREER = careerFrom(careerJson);
