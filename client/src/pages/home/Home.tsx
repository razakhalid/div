import React, { useContext } from "react";
import { Page } from "../../../../shared/types";
import { endpointUrls, paths } from "../../constants";
import { useNavigate } from "react-router-dom";
import { Box, Button, Grid } from "@mui/material";
import { AppContext } from "../../App.tsx";
import PageThumbnail from "./PageThumbnail.tsx";

export default function Home() {
  const { pages, setPages } = useContext(AppContext);
  const navigate = useNavigate();

  // useEffect(() => {
  //   console.log(pages);
  // }, [pages]);

  const handlePageClick = (page: Page) => {
    navigate({ pathname: paths.PAGE_PAGE, search: "?pageId=" + page.page_id });
  };

  const handleNewPage = () => {
    navigate({ pathname: paths.PAGE_PAGE });
  };

  const deletePage = async (
    event: React.MouseEvent,
    pageId: string | undefined,
  ) => {
    event.stopPropagation();

    try {
      await fetch(`${endpointUrls.pages}/${pageId}`, {
        method: "DELETE",
      });
      const updatedPages = pages.filter(
        (page: Page) => page.page_id !== pageId,
      );

      setPages(updatedPages);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Grid>
      {pages?.length ? (
        <Grid container className="pages-grid" columns={2} columnSpacing={4}>
          {pages.map((page: Page) => (
            <Grid item>
              <PageThumbnail
                key={page.page_id}
                page={page}
                handlePageClick={() => console.log()}
                handleDeletePage={() => console.log()}
              />
            </Grid>
          ))}
        </Grid>
      ) : null}
      <Box sx={{ py: 4 }}>
        <Button onClick={handleNewPage} variant={"contained"}>
          New Page +
        </Button>
      </Box>
    </Grid>
  );
}
