import { expect } from "vitest";
import * as matchers from "@testing-library/jest-dom/matchers";

expect.extend(matchers);

export default {
  // …
  test: {
    globals: true,
    setupFiles: ['./src/testsSetup.ts'],
  },
}
