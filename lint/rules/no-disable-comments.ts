import { defineRule } from "vite-plus/lint/plugins";

const DISABLE_DIRECTIVE =
  /^[\s*]*(?<directive>(?:oxlint|eslint)-disable[\w-]*|@ts-(?:ignore|expect-error|nocheck))\b/u;

function findDisableDirective(commentText: string): string | undefined {
  return DISABLE_DIRECTIVE.exec(commentText)?.groups?.["directive"];
}

export const noDisableComments = defineRule({
  meta: {
    type: "problem",
    docs: {
      description: "Bans comments that switch off lint rules or type checks.",
    },
    messages: {
      noDisableComment: "`{{directive}}` switches off a guardrail. Fix the code instead.",
    },
  },
  create(context) {
    return {
      Program(): void {
        for (const comment of context.sourceCode.getAllComments()) {
          const directive = findDisableDirective(comment.value);
          if (directive !== undefined) {
            context.report({
              loc: comment.loc,
              messageId: "noDisableComment",
              data: { directive },
            });
          }
        }
      },
    };
  },
});
