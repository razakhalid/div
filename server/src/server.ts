import express from "express";
import path from "path";

const app = express();
const port = process.env.PORT || 8080;
const clientPath = path.join(__dirname, '..', '..', '..', 'client');

app.use(express.static(`${clientPath}/dist`));

app.get("/*", (_, res) => {
  res.sendFile(`${clientPath}/dist/index.html`);
})

app.listen(port, () => {
  console.log("Listening on port ", port);
});
