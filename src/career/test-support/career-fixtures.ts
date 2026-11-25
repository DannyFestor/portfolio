/** Made-up career data for the unit tests; the real data lives in src/data/career.json. */
import type { CareerExport, Engagement, Project } from "../career-export.ts";

export function engagementFixture(overrides: Partial<Engagement> = {}): Engagement {
  return {
    note: "2020-01 Example Co",
    organization: "Example Co",
    engagement_type: "freelance",
    role: "Developer",
    start: "2020-01",
    end: null,
    summary: ["Built things."],
    ...overrides,
  };
}

export function projectFixture(overrides: Partial<Project> = {}): Project {
  return {
    note: "Example Co - Shop",
    engagement: "2020-01 Example Co",
    title: "Example shop",
    start: "2020-01",
    end: null,
    role: "Developer",
    focus: null,
    team_size: null,
    industry: "E-commerce",
    skills: ["TypeScript"],
    description: ["Built a shop."],
    achievements: [],
    ...overrides,
  };
}

export function careerExportFixture(overrides: Partial<CareerExport> = {}): CareerExport {
  return {
    schema_version: 1,
    profile: { name: "Example Person", headline: "Engineer", summary: ["Writes software."] },
    engagements: [engagementFixture()],
    projects: [projectFixture()],
    qualifications: [],
    languages: [{ name: "English", level: "Native" }],
    ...overrides,
  };
}
