/**
 * Structural placeholder for the separately deployable Node.js worker
 * described in docs/05_SYSTEM_ARCHITECTURE.md. This file establishes the
 * worker/web boundary only; pg-boss job processing, schedules, and business
 * logic are implemented under their own approved tasks (see IMP-042).
 *
 * This module must not import Next.js, browser APIs, or UI code.
 */
export function describeWorkerBaseline(): string {
  return "worker baseline: not yet implemented";
}
