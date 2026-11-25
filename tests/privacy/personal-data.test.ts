import { describe, expect, it } from "vite-plus/test";

import { personalDataFound } from "./personal-data.ts";

describe("phone numbers", () => {
  it.each([
    "Tel. 090-1234-5678",
    "+81 90 1234 5678",
    "0957-12-3456",
    "(095) 812-3456",
    "+49 170 1234567",
    "0170/1234567",
  ])("are found in %s", (text) => {
    expect(personalDataFound(text)).toStrictEqual(["phone number"]);
  });

  it.each([
    "2018 — 2020",
    "2024-04-17",
    "2025 - 2026",
    "Go 1.23, PostgreSQL 16",
    "1,200,000 users",
  ])("are not confused with %s", (text) => {
    expect(personalDataFound(text)).toStrictEqual([]);
  });
});

describe("emails", () => {
  it.each(["hello@festor.info", "danny@festor.info", "Danny@Festor.info"])("allow %s", (text) => {
    expect(personalDataFound(text)).toStrictEqual([]);
  });

  it.each(["danny.festor@example.com", "hello@festor.info.example.com", "me@gmail.com"])(
    "refuse %s",
    (text) => {
      expect(personalDataFound(text)).toStrictEqual(["email other than the two allowed"]);
    },
  );
});

describe("labels", () => {
  it.each([
    ["Date of birth: 1 January 1990", "birth-date label"],
    ["Geburtsdatum: 01.01.1990", "birth-date label"],
    ["生年月日 1990年1月1日", "birth-date label"],
    ["Address: Example Street", "address label"],
    ["Home address", "address label"],
    ["Anschrift", "address label"],
    ["Adresse", "address label"],
    ["現住所 長崎県", "address label"],
    ["〒850-0000", "address label"],
    ["Nationality: German", "nationality label"],
    ["Staatsangehörigkeit: deutsch", "nationality label"],
    ["国籍 ドイツ", "nationality label"],
  ])("find %s", (text, rule) => {
    expect(personalDataFound(text)).toStrictEqual([rule]);
  });

  it.each(["E-Mail-Adresse", "IP address ranges", "Nagasaki, Japan", "Freelance since 2020"])(
    "pass %s",
    (text) => {
      expect(personalDataFound(text)).toStrictEqual([]);
    },
  );
});
