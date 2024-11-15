import { Button, Grid, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { AppContext } from "../../App.tsx";

export default function Login() {
  const github_client_id = import.meta.env.VITE_GITHUB_CLIENT_ID;
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
    <Grid
      container
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      rowSpacing={4}
      alignItems={"center"}
      height={"100%"}
      width={"100%"}
    >
      <Grid item textAlign={"center"}>
        <Typography component={"h3"} variant={"h3"}>
          Welcome to Div!
        </Typography>
      </Grid>
      <Grid item>
        <Button onClick={handleClickGithubLogin} variant={"contained"}>
          Continue with GitHub
        </Button>
      </Grid>
    </Grid>
  );
}
