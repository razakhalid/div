import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface Palette {
    navBackground: string;
  }
  interface PaletteOptions {
    navBackground: string;
  }
}
export default createTheme({
  palette: {
    navBackground: "rgb(247,247,245)",
  },
});
