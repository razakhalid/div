import { paths } from "../../constants";
import { Box, Button, Grid } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../App.tsx";
import { Page } from "../../../../shared/types";
import LinkButton from "./LinkButton";
import NoteIcon from "@mui/icons-material/Note";

export default function PageLinks() {
  const { pages } = useContext(AppContext);
  return (
    <Grid container display={"flex"} flexDirection={"column"}>
      {pages?.map((page: Page) => (
        <NavLink
          to={{ pathname: `${paths.PAGE_PAGE}/${page.page_id}` }}
          className={({ isActive }) => (isActive ? "active" : "")}
          key={page.page_id}
        >
          <LinkButton label={page.title} icon={<NoteIcon />} />
        </NavLink>
      ))}
      <Box sx={{ pl: 2, pt: 1 }}>
        <Link to={paths.PAGE_PAGE}>
          <Button variant={"contained"}>New Page +</Button>
        </Link>
      </Box>
    </Grid>
  );
}
