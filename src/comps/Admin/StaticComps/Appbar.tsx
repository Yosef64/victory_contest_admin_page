import { AppBar, Avatar, Badge, Box, IconButton, Toolbar } from "@mui/material";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Container from "@mui/material/Container";
import Slide from "@mui/material/Slide";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import leetcodeImage from "../../../assets/leetcode.jpg";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",

      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

function HideOnScroll(props: any) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children ?? <div />}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};
export default function Appbar(props: any) {
  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar
          position="sticky"
          elevation={0}
          sx={{
            backdropFilter: "blur(6px)",
            bgcolor: "inherit",
          }}
        >
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              color: "blue",
            }}
          >
            <Box sx={{ display: { md: "none", sm: "block" } }}>
              <IconButton
                size="small"
                edge="start"
                color="inherit"
                aria-label="menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  role="img"
                  width="1.em"
                  height="1em"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 24 24"
                  style={{ fill: "currentColor" }}
                >
                  <circle cx="4" cy="12" r="1" fill="currentColor" />
                  <rect
                    width="14"
                    height="2"
                    x="7"
                    y="11"
                    fill="currentColor"
                    rx="0.94"
                    ry="0.94"
                  />
                  <rect
                    width="18"
                    height="2"
                    x="3"
                    y="16"
                    fill="currentColor"
                    rx="0.94"
                    ry="0.94"
                  />
                  <rect
                    width="18"
                    height="2"
                    x="3"
                    y="6"
                    fill="currentColor"
                    rx="0.94"
                    ry="0.94"
                  />
                </svg>
              </IconButton>
            </Box>
            <Box>
              <IconButton sx={{ alignSelf: "flex-start" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  role="img"
                  width="0.9em"
                  height="0.9em"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 24 24"
                  style={{ fill: "currentColor" }}
                >
                  <path
                    fill="currentColor"
                    d="M20.71 19.29l-3.4-3.39A7.92 7.92 0 0 0 19 11a8 8 0 1 0-8 8a7.92 7.92 0 0 0 4.9-1.69l3.39 3.4a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42M5 11a6 6 0 1 1 6 6a6 6 0 0 1-6-6"
                  />
                </svg>
              </IconButton>
            </Box>

            <Box
              sx={{
                ml: "auto",
                display: "flex",
                justifyContent: "space-around",
                gap: 2,
              }}
            >
              <IconButton>
                <Badge color="secondary" badgeContent={2} overlap="circular">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    role="img"
                    width="1em"
                    height="1em"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 24 24"
                    style={{ fill: "currentColor" }}
                  >
                    <path d="M20.52 15.21l-1.8-1.81V8.94a6.86 6.86 0 0 0-5.82-6.88a6.74 6.74 0 0 0-7.62 6.67v4.67l-1.8 1.81A1.64 1.64 0 0 0 4.64 18H8v.34A3.84 3.84 0 0 0 12 22a3.84 3.84 0 0 0 4-3.66V18h3.36a1.64 1.64 0 0 0 1.16-2.79M14 18.34A1.88 1.88 0 0 1 12 20a1.88 1.88 0 0 1-2-1.66V18h4Z" />
                  </svg>
                </Badge>
              </IconButton>
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
              >
                {" "}
                <Avatar alt="Remy Sharp" src={leetcodeImage} />
              </StyledBadge>
            </Box>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </React.Fragment>
  );
}
