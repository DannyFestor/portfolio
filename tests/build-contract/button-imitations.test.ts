import { describe, expect, it } from "vite-plus/test";

import { buttonImitations } from "./button-imitations.ts";

const IMITATIONS = [
  '<button class="call-to-action" type="button">',
  '<a href="mailto:hello@festor.info" role="button">',
  '<a class="cta button" href="/contact/">',
  "<a class='btn-primary' href='/contact/'>",
  '<a class="contact-button" href="/contact/">',
];

const ALLOWED = [
  '<a class="call-to-action" href="mailto:hello@festor.info">',
  '<a href="/blog/">',
  '<a class="buttonhole-stitch" href="/about/">',
  '<button type="submit">',
  '<abbr title="call to action">',
];

describe("buttonImitations", () => {
  it.each(IMITATIONS)("finds %s", (tag) => {
    expect(buttonImitations(`<p>${tag}text</p>`)).toStrictEqual([tag]);
  });

  it.each(ALLOWED)("lets %s pass", (tag) => {
    expect(buttonImitations(`<p>${tag}text</p>`)).toStrictEqual([]);
  });
});
