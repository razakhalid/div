import { connect } from "./index";
import { describe, it } from "vitest";

describe("DB", () => {
  it("connects", async () => {
    await connect();
  });
});
