import React, { useContext } from "react";
import { Page } from "../../../../shared/types";
import { endpointUrls, paths } from "../../constants";
import { useNavigate } from "react-router-dom";
import { Button, Grid } from "@mui/material";
import { AppContext } from "../../App.tsx";

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
        <div className="pages-grid">
          {pages.map((page: Page) => (
            <div
              key={page.page_id}
              className="page-item"
              onClick={() => handlePageClick(page)}
            >
              <div className="pages-header">
                <button onClick={(event) => deletePage(event, page.page_id)}>
                  x
                </button>
              </div>
              <h2>{page.title}</h2>
              <p>{page.content}</p>
            </div>
          ))}
        </div>
      ) : null}
      <Button onClick={handleNewPage} variant={"contained"}>
        New Page +
      </Button>
    </Grid>
  );
}
