import express from "express";
import axios from "axios";

const authRouter = express.Router();

authRouter.get("/github/callback", async (req, res) => {
  const { code } = req.query;
  if (code) console.log("i have a code i have a code", code);

  try {
    const url = `https://github.com/login/oauth/access_token`;
    const response = await axios.get(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Accept-Encoding": "application/json",
      },
      params: {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
        redirect_uri: "http://localhost:8080/api/v1/auth/github/callback", // TODO: make dynamic for production
      },
    });
    console.log(response);
    const { access_token } = response?.data;
    res.cookie("github_access_token", access_token, {
      secure: true,
      maxAge: 120000,
      httpOnly: true,
    });
  } catch (err) {
    console.error(err);
  }

  // TODO: make dynamic for production
  return res.redirect(process.env.CLIENT_URL_LOGIN);
});

export default authRouter;
