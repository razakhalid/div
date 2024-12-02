import { Page } from "../../../../shared/types";
import crypto from "crypto";
import { query } from "../../services/db";
import { logError } from "../../services/logger";

let pages: Page[] = [];
const userEmail = "ra97za@gmail.com";

export async function getAll() {
  try {
    const sql = `select * from pages where user_email = '${userEmail}';`;
    const rows = await query(sql);
    // console.log("rows: ", rows);
    return rows;
  } catch (error) {
    logError(error);
    throw error;
  }
}

export async function getById(id: string) {
  try {
    const sql = `select * from pages where page_id = '${id}' and user_email = '${userEmail}';`;
    const page = await query(sql);
    // console.log("page: ", page, sql);
    return page;
  } catch (error) {
    logError(error);
    throw error;
  }
}

export async function create(page: Page) {
  if (!page.page_id) page.page_id = crypto.randomUUID();
  try {
    const sql = `
        insert into pages (page_id, title, content, user_email)
          values (
            '${page.page_id}',
            '${page.title}',
            '${page.content}',
            '${userEmail}'
          );
    `;
    // console.log(sql);
    await query(sql);
  } catch (error) {
    logError(error);
  }

  pages.push(page);
  return page;
}

export async function update(newPage: Page) {
  // console.log(newPage);
  const sql = `
    UPDATE "pages" 
    SET "title" = '${newPage.title}', 
        "content" = '${newPage.content}'
    WHERE "page_id" = '${newPage.page_id}'
    RETURNING *`;
  const pages = await query(sql);

  return pages;
}
export async function deletePage(id: string): Promise<any> {
  try {
    const sql = `delete from pages where page_id = '${id}' and user_email = '${userEmail}';`;
    return await query(sql);
  } catch (error) {
    logError(error);
  }
}
