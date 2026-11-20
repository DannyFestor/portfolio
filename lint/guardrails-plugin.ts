import { definePlugin } from "vite-plus/lint/plugins";

import { noDisableComments } from "./rules/no-disable-comments.ts";

export default definePlugin({
  meta: { name: "guardrails" },
  rules: { "no-disable-comments": noDisableComments },
});
