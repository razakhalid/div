import { Box, Button } from "@mui/material";
import { paths, sizes } from "../../constants";
import { NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import PageLinks from "./PageLinks.tsx";
import { useContext } from "react";
import { AppContext } from "../../App.tsx";

const topLinks = [
  {
    path: paths.HOME_PAGE,
    icon: <HomeIcon />,
    label: "Home",
  },
];

const LinkButton = ({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) => (
  <Button
    sx={{
      width: "100%",
      justifyContent: "flex-start",
      paddingLeft: (theme) => theme.spacing(2),
    }}
  >
    {icon}
    <Box sx={{ marginLeft: (theme) => theme.spacing(1) }}>{label}</Box>
  </Button>
);

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
  const { pages } = useContext(AppContext);

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
          <TopLinks />
          <PageLinks
            pageLinks={pages.map(({ id, title }) => ({ id, title }))}
          />
        </Box>
        <Box
          className={"links-container bottom"}
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
