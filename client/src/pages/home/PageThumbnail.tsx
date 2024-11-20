import { Page } from "../../../../shared/types";
// import { Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { Box, Card, Icon, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function PageThumbnail({
  page,
  handlePageClick,
  handleDeletePage,
}: {
  page: Page;
  handlePageClick: (pageId: string) => void;
  handleDeletePage: (event: React.MouseEvent, pageId: string) => void;
}) {
  return (
    <Card
      key={page.page_id}
      className="page-item"
      onClick={() => handlePageClick(page.page_id ?? "")}
    >
      <Box
        className="pages-header"
        sx={{ display: "flex", justifyContent: "flex-end" }}
      >
        <IconButton
          onClick={(event) => handleDeletePage(event, page.page_id ?? "")}
          src={CloseIcon}
        >
          <Icon component={CloseIcon}></Icon>
        </IconButton>
      </Box>
      <Box className="card-main" sx={{ p: 2 }}>
        <h2>{page.title}</h2>
        <p>{page.content}</p>
      </Box>
    </Card>
  );
}
