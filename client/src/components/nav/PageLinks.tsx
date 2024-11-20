import { paths } from "../../constants";
import { Box, Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../App.tsx";
import { Page } from "../../../../shared/types";

export default function PageLinks() {
  const { pages } = useContext(AppContext);
  return (
    <Grid container display={"flex"} flexDirection={"column"} pl={2}>
      {pages?.map((page: Page) => (
        <Link
          key={page.page_id}
          to={{ pathname: `${paths.PAGE_PAGE}/${page.page_id}` }}
        >
          <Button sx={{ justifyContent: "flex-start" }}>{page.title}</Button>
        </Link>
      ))}
      <Box sx={{ py: 2 }}>
        <Link to={paths.PAGE_PAGE}>
          <Button variant={"contained"}>New Page +</Button>
        </Link>
      </Box>
    </Grid>
  );
}
