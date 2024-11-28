import React from "react";
import { endpointUrls, paths } from "../../constants";
import { useContext, useEffect, useState } from "react";
import { Page as PageType } from "../../../../shared/types";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Grid, Input } from "@mui/material";
import { AppContext } from "../../App.tsx";

export default function Page() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const params = useParams();
  const [page, setPage] = useState<PageType | null>(null);
  const { pages, setPages } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    const pageId = params.id;
    let currentPage = {
      title: "",
      content: "",
    };
    if (pageId) {
      currentPage = pages.find((page: PageType) => page.page_id === pageId);
    }
    setTitle(currentPage.title);
    setContent(currentPage.content);
    setPage(currentPage);
  }, [params]);

  const handleAddPage = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch(endpointUrls.pages, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
        }),
      });

      const newPage = await response.json();
      setPages((pages: PageType[]) => [...pages, newPage]);
      navigate({ pathname: `${paths.PAGE_PAGE}/${newPage.page_id}` });
      console.log(pages);
    } catch (e) {
      console.log(e);
    }
  };

  const handleUpdatePage = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!page) {
      return;
    }

    try {
      const response = await fetch(`${endpointUrls.pages}/${page.page_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
        }),
      });

      const updatedPage = await response.json();

      setPage(updatedPage);
      setTitle(updatedPage.title);
      setContent(updatedPage.content);
    } catch (e) {
      console.log(e);
    }
  };

  const handleCancel = () => {
    setTitle("");
    setContent("");
    setPage(null);
  };
  return (
    <form
      className="page-form"
      onSubmit={(event) =>
        page && page.title ? handleUpdatePage(event) : handleAddPage(event)
      }
    >
      <Grid container display={"grid"} columns={1} rowSpacing={2} px={4}>
        <Grid item component={"div"}>
          <Input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Title"
            required
            fullWidth
            sx={{ width: "100%" }}
          ></Input>
        </Grid>

        <Grid item component={"div"}>
          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="Content"
            required
            rows={20}
            style={{ width: "97%" }}
          ></textarea>
        </Grid>

        <Grid item component={"div"}>
          {page ? (
            <div className="edit-buttons">
              <Button onClick={handleCancel} variant={"outlined"}>
                Cancel
              </Button>
              <Button type="submit" variant={"contained"}>
                Save
              </Button>
            </div>
          ) : (
            <Button
              type="submit"
              variant={"contained"}
              disabled={!title}
              fullWidth
            >
              Add Page
            </Button>
          )}
        </Grid>
      </Grid>
    </form>
  );
}
