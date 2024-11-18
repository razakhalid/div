// import { Grid, Input, Typography } from "@mui/material";
import { endpointUrls } from "../../constants";
import { useContext, useEffect, useState } from "react";
import { Page as PageType } from "../../../../shared/types";
import { useSearchParams } from "react-router-dom";
import { Button, Grid, Input, TextareaAutosize } from "@mui/material";
import { AppContext } from "../../App.tsx";

export default function Page() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [URLSearchParams] = useSearchParams();
  const [page, setPage] = useState<PageType | null>(null);
  const { pages, setPages } = useContext(AppContext);

  useEffect(() => {
    const pageId = URLSearchParams.get("pageId");
    if (pageId) {
      const currentPage = pages.find(
        (page: PageType) => page.page_id === pageId,
      );
      setTitle(currentPage?.title);
      setContent(currentPage?.content);
      setPage(currentPage);
    }
  }, [URLSearchParams]);

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

      setPage(newPage);
      setTitle(newPage.title);
      setContent(newPage.content);
      setPages((pages: PageType[]) => [...pages, newPage]);
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
        page ? handleUpdatePage(event) : handleAddPage(event)
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
          ></Input>
        </Grid>

        <Grid item component={"div"}>
          <TextareaAutosize
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="Content"
            required
            minRows={20}
            style={{ width: "100%" }}
          ></TextareaAutosize>
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
