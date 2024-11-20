import { Page } from "../../../../shared/types";
// import { Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { Box, Button, Card, Icon, IconButton, Typography } from "@mui/material";
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
    <Box sx={{ position: "relative" }} className={"page-thumbnail"}>
      <Card key={page.page_id} sx={{ pt: 4 }}>
        <IconButton
          onClick={(event) => {
            event.stopPropagation();
            handleDeletePage(event, page.page_id ?? "");
          }}
          sx={{ position: "absolute", top: 0, right: 0 }}
        >
          <Icon component={CloseIcon}></Icon>
        </IconButton>
        <Button
          onClick={() => handlePageClick(page.page_id ?? "")}
          sx={{ color: "black", textAlign: "left" }}
        >
          <Box
            className="card-main"
            sx={{ px: 2, minWidth: 80, minHeight: 50 }}
          >
            <Typography component={"h5"} variant={"h5"}>
              {page.title}
            </Typography>
          </Box>
        </Button>
      </Card>
    </Box>
  );
}
