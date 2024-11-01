import express, { Request, Response } from "express";
import { create, deletePage, getAll, getById, update } from "./model";

const pagesRouter = express.Router();

pagesRouter.get("/", async (_, res: Response) => {
  const pages = await getAll();

  res.json(pages);
});

pagesRouter.get("/:pageId", async (req: Request, res: Response) => {
  const page = await getById(req.params.pageId);

  res.json(page);
});

// @ts-ignore
pagesRouter.post("/", async (req: Request, res: Response) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).send("title and content fields required");
  }

  try {
    const page = await create({
      title,
      content,
    });
    res.json(page);
  } catch (error) {
    res.status(500).send("Oops something went wrong");
  }
});

// @ts-ignore
pagesRouter.put("/:id", async (req: Request, res: Response) => {
  const { title, content } = req.body;
  const id = req.params.id;

  if (!title || !content) {
    return res.status(400).send("title and content fields required");
  }

  if (!id) {
    return res.status(400).send("id is missing");
  }

  try {
    const updatedPage = await update({
      id,
      title,
      content,
    });
    res.json(updatedPage);
  } catch (error) {
    res.status(500).send("oops, something went wrong");
  }
});

// @ts-ignore
pagesRouter.delete("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).send("id is missing");
  }

  try {
    await deletePage(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).send("oops, something went wrong");
  }
});

export default pagesRouter;
