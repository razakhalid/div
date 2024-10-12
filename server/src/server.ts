require("dotenv").config();
import app from "./app";

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(process.env.GITHUB_CLIENT_ID);
  console.log("Listening on port ", port);
});
