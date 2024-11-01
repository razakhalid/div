import { paths } from "../../constants";
import { Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../App.tsx";

export default function PageLinks() {
  const { pages } = useContext(AppContext);
  return (
    <Grid display={"flex"} flexDirection={"column"} pl={2}>
      {pages?.map((page) => (
        <Link
          key={page.id}
          to={{ pathname: paths.PAGE_PAGE, search: "?pageId=" + page.id }}
        >
          <Button>{page.title}</Button>
        </Link>
      ))}
      <Link to={paths.PAGE_PAGE}>
        <Button>New Page +</Button>
      </Link>
    </Grid>
  );
}
