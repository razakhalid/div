import React from "react";
import { Box } from "@mui/material";
import { paths, sizes } from "../../constants";
import { NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import PageLinks from "./PageLinks.tsx";
import LinkButton from "./LinkButton";

const topLinks = [
  {
    path: paths.HOME_PAGE,
    icon: <HomeIcon />,
    label: "Home",
  },
];

const TopLinks = () =>
  topLinks.map((link, index) => (
    <NavLink
      to={link.path}
      className={({ isActive }) => (isActive ? "active" : "")}
      key={index}
    >
      <LinkButton label={link.label} icon={link.icon} />
    </NavLink>
  ));

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
          data-testid={"top-links-container"}
          sx={{
            paddingTop: (theme) => theme.spacing(4),
            paddingBottom: (theme) => theme.spacing(4),
          }}
        >
          <TopLinks />
          <PageLinks />
        </Box>
        <Box
          className={"links-container bottom"}
          data-testid={"bottom-links-container"}
          sx={{
            paddingTop: (theme) => theme.spacing(4),
            paddingBottom: (theme) => theme.spacing(4),
          }}
        >
          <NavLink to={paths.LOGIN_PAGE}>
            <LinkButton icon={<LogoutIcon />} label={"Logout"} />
          </NavLink>
        </Box>
      </Box>
    </nav>
  );
}
