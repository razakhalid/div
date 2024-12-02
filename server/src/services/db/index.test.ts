import { connect, query } from "./index";
import { describe, it } from "vitest";

describe("DB", () => {
  it("connects", async () => {
    await connect();
    await query(`create table if not exists "users" (email varchar(255) primary key unique not null);`);
  });
});
