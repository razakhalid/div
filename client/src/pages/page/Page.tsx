// import { Grid, Input, Typography } from "@mui/material";
import { endpointUrls } from "../../constants";
import { useContext, useEffect, useState } from "react";
import { Page as PageType } from "../../../../shared/types";
import { useSearchParams } from "react-router-dom";
import { Button } from "@mui/material";
import { AppContext } from "../../App.tsx";

export default function Page() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [URLSearchParams] = useSearchParams();
  const [page, setPage] = useState<PageType | null>(null);
  const { pages, setPages } = useContext(AppContext);

  useEffect(() => {
    const pageId = URLSearchParams.get("pageId");
    const fetchPage = async (pageId: string) => {
      try {
        const response = await fetch(`${endpointUrls.pages}/${pageId}`);

        const page: PageType = await response.json();
        setTitle(page.title);
        setContent(page.content);

        setPage(page);
      } catch (e) {
        console.log(e);
      }
    };

    if (pageId) fetchPage(pageId);
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
      setPages((pages) => [...pages, newPage]);
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
      const response = await fetch(`${endpointUrls.pages}/${page.id}`, {
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
      <input
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Title"
        required
      ></input>
      <textarea
        value={content}
        onChange={(event) => setContent(event.target.value)}
        placeholder="Content"
        rows={10}
        required
      ></textarea>

      {page ? (
        <div className="edit-buttons">
          <button type="submit">Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <Button type="submit" variant={"contained"} disabled={!title}>
          Add Page
        </Button>
      )}
    </form>
  );
}
