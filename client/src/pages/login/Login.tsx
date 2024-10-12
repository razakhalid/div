import { Button, Typography } from "@mui/material";
import { useEffect } from "react";
// import { useSearchParams } from "react-router-dom";
// import axios from "axios";

export default function Login() {
  // const params = new URLSearchParams(window.location.search);
  // const [searchParams, setSearchParams] = useSearchParams();
  const github_client_id = import.meta.env.VITE_GITHUB_CLIENT_ID;
  // const github_client_secret = import.meta.env.GITHUB_CLIENT_SECRET;

  useEffect(() => {
    //   const code = searchParams.get("code");
    //   if (code) {
    //     searchParams.delete("code");
    //     setSearchParams(searchParams);
    //     console.log(code);
    //     requestGithubAccessToken(code);
    //   }
    console.log(import.meta.env.VITE_GITHUB_CLIENT_ID);
  }, []);
  const handleClickGithubLogin = async () => {
    const redirect_uri = encodeURIComponent(
      `http://localhost:8080/api/v1/auth/github/callback`,
    );
    const url = `https://github.com/login/oauth/authorize?client_id=${github_client_id}&redirect_uri=${redirect_uri}`;
    window.open(url);
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
