import { Box, Button, Grid, Typography } from "@mui/material";

export default function Home() {
  const onClickNewPage = async () => {};
  return (
    <Box className="home-page" sx={{ height: "100%" }}>
      <Typography component={"h5"} variant={"h5"} className="header">
        Hello there!
      </Typography>
      <Grid
        container
        columns={1}
        sx={{ height: "100%", alignItems: "center", justifyContent: "center" }}
      >
        <Grid item>
          <Button variant="contained" onClick={onClickNewPage}>
            New Page +
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
