import { Page } from "../../../../shared/types";
import crypto from "crypto";

let pages: Page[] = [];

export async function getAll() {
  return pages;
}

export async function getById(id: string) {
  return pages.find((page) => page.id === id);
}

export async function create(page: Page) {
  if (!page.id) page.id = crypto.randomUUID();
  pages.push(page);
  return page;
}

export async function update(newPage: Page) {
  const id = newPage.id;
  const index = pages.findIndex((oldPage) => oldPage.id === id);
  pages[index] = newPage;
  return pages;
}
export async function deletePage(id: string) {
  pages = pages.filter((page) => page.id !== id);
  return pages;
}
