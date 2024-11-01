import { connect } from "./index";

describe("DB", () => {
  it("connects", async () => {
    await connect();
  });
});
