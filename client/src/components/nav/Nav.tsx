import { Box, Button } from "@mui/material";
import { paths, sizes } from "../../constants";
import { Link, NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";

const links = [
  {
    path: paths.HOME_PAGE,
    icon: HomeIcon,
    label: "Home",
  },
];

function NavBarLinks() {
  return links.map((link, index) => (
    <NavLink
      to={link.path}
      className={({ isActive }) => (isActive ? "active" : "")}
      key={index}
    >
      <Button>
        <link.icon />
        {link.label}
      </Button>
    </NavLink>
  ));
}

export default function Nav() {
  return (
    <nav>
      <Box
        sx={{
          width: sizes.navWidth.desktop,
          height: "100%",
          background: (theme) => theme.palette.navBackground,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box
          className={"links-container top"}
          sx={{
            paddingTop: (theme) => theme.spacing(4),
            paddingBottom: (theme) => theme.spacing(4),
          }}
        >
          <NavBarLinks />
        </Box>
        <Box
          className={"links-container bottom"}
          sx={{
            paddingTop: (theme) => theme.spacing(4),
            paddingBottom: (theme) => theme.spacing(4),
          }}
        >
          <Button component={Link} to={paths.LOGIN_PAGE}>
            Logout
          </Button>
        </Box>
      </Box>
    </nav>
  );
}
