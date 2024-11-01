import http from "http";
import { connect } from "./services/db";

require("dotenv").config();
import app from "./app";

const port = process.env.PORT || 8080;

const server = http.createServer(app);

async function startServer() {
  await connect();
  server.listen(port, () => {
    console.log("Listening on port ", port);
  });
}

startServer();
