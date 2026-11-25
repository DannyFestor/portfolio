/**
 * The career as the pages read it (#13): engagements and projects newest first, lookups by vault
 * note name and the current engagement, from data validated against the kept kariera schema.
 */
import { validCareerExport } from "./career-export-validation.ts";
import type { CareerExport, Engagement, Profile, Project } from "./career-export.ts";
import { newestFirst } from "./newest-first.ts";
import { NotesByName } from "./notes-by-name.ts";

export class Career {
  readonly profile: Profile;
  readonly engagements: readonly Engagement[];
  readonly projects: readonly Project[];
  readonly #engagementsByNote: NotesByName<Engagement>;
  readonly #projectsByNote: NotesByName<Project>;

  constructor(careerExport: CareerExport) {
    this.profile = careerExport.profile;
    this.engagements = newestFirst(careerExport.engagements);
    this.projects = newestFirst(careerExport.projects);
    this.#engagementsByNote = new NotesByName("engagement", this.engagements);
    this.#projectsByNote = new NotesByName("project", this.projects);
  }

  /** The newest engagement that has not ended. */
  get currentEngagement(): Engagement | undefined {
    return this.engagements.find(({ end }) => end === null);
  }

  engagement(note: string): Engagement {
    return this.#engagementsByNote.get(note);
  }

  project(note: string): Project {
    return this.#projectsByNote.get(note);
  }

  hasProject(note: string): boolean {
    return this.#projectsByNote.has(note);
  }
}

export function careerFrom(data: unknown): Career {
  return new Career(validCareerExport(data));
}
