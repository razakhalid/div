import { Client } from "node-postgres";
import { log, logError } from "../logger";
require("dotenv").config();

const config = {
  user: process.env.DB_USER as string,
  host: process.env.DB_HOST as string,
  port: Number(process.env.DB_PORT) as number,
  database: process.env.DB_DATABASE as string,
};

const client = new Client(config);

export async function connect() {
  try {
    await client.connect();
    const timestamp = (await query("SELECT NOW()")) as { now: string }[];
    log("Connected to DB at: ", JSON.stringify(timestamp[0]));
  } catch (err) {
    logError(err);
  }
}

export async function query(query: string) {
  try {
    const result = await client.query(query);
    const { rows } = result;
    return rows;
  } catch (error) {
    logError(error);
    return error;
  }
}
