import { describe, expect, it } from "vitest";
import { describeWorkerBaseline } from "./index";

describe("worker baseline placeholder", () => {
  it("reports itself as not yet implemented", () => {
    expect(describeWorkerBaseline()).toBe(
      "worker baseline: not yet implemented",
    );
  });
});
