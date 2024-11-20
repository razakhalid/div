import { Page } from "../../../../shared/types";
// import { Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { Box, Button, Card, Icon, IconButton } from "@mui/material";
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
    <Box sx={{ position: "relative" }}>
      <Card key={page.page_id} className="page-item" sx={{ pt: 4 }}>
        <IconButton
          onClick={(event) => {
            event.stopPropagation();
            handleDeletePage(event, page.page_id ?? "");
          }}
          src={CloseIcon}
          sx={{ position: "absolute", top: 0, right: 0 }}
        >
          <Icon component={CloseIcon}></Icon>
        </IconButton>
        <Button
          onClick={() => handlePageClick(page.page_id ?? "")}
          sx={{ color: "black" }}
        >
          <Box className="card-main" sx={{ px: 2 }}>
            <h2>{page.title}</h2>
            <p>{page.content}</p>
          </Box>
        </Button>
      </Card>
    </Box>
  );
}
