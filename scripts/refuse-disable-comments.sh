#!/bin/sh
# Backstop for the guardrails/no-disable-comments lint rule: a file-wide `oxlint-disable` comment silences every
# oxlint rule, that one included, so the comments are also searched for here, outside the linter.
set -eu

comment_start='(//|/\*|^[[:space:]]*\*)[[:space:]]*'
directive='((oxlint|eslint|stylelint)-disable|@ts-(ignore|expect-error|nocheck))'

# The rule's own tests hold the directives as test data.
if git grep --untracked -n -E "$comment_start$directive" -- ':!lint/rules/no-disable-comments.test.ts'; then
  echo "refuse-disable-comments: comments that switch off a guardrail are refused, fix the code instead." >&2
  exit 1
fi
