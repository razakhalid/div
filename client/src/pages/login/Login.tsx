import { Button, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { AppContext } from "../../App.tsx";
// import { useSearchParams } from "react-router-dom";
// import axios from "axios";

export default function Login() {
  // const params = new URLSearchParams(window.location.search);
  // const [searchParams, setSearchParams] = useSearchParams();
  const github_client_id = import.meta.env.VITE_GITHUB_CLIENT_ID;
  // const github_client_secret = import.meta.env.GITHUB_CLIENT_SECRET;
  const appContext = useContext(AppContext);
  useEffect(() => {
    console.log(appContext);
  }, []);
  const handleClickGithubLogin = async () => {
    const redirect_uri = encodeURIComponent(
      `http://localhost:8080/api/v1/auth/github/callback`,
    );
    const url = `https://github.com/login/oauth/authorize?client_id=${github_client_id}&redirect_uri=${redirect_uri}`;
    window.location.replace(url);
  };
  return (
    <>
      <Typography component={"h1"} variant={"h1"}>
        Login
      </Typography>
      <Button onClick={handleClickGithubLogin}>Login with GitHub</Button>
    </>
  );
}
