import { Grid, Input, Typography } from "@mui/material";

export default function Page() {
  return (
    <Grid component={"form"} height={"85vh"}>
      <Typography component="h6">
        <Input placeholder="Title" sx={{ fontSize: 28 }}></Input>
      </Typography>
      <textarea style={{ width: "100%", height: "100%" }} />
    </Grid>
  );
}
