/** One step of `vp run career:sync`. Steps run in order; the first that throws stops the sync. */
export interface CareerSyncStep {
  readonly description: string;
  readonly run: () => void;
}

export function runCareerSync(steps: readonly CareerSyncStep[]): void {
  for (const step of steps) {
    process.stdout.write(`career:sync: ${step.description}\n`);
    step.run();
  }
}
