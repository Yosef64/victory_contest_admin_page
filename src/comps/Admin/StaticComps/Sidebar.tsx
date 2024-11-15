import {
  Avatar,
  Badge,
  Box,
  Card,
  CardHeader,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { MenuListItems } from "./Sidentmenu.tsx";
import Logo from "./Logo.tsx";
import leetcodeImage from "../../../assets/leetcode.jpg";
import { NavLink, useLocation } from "react-router-dom";
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
export default function Sidebar() {
  const location = useLocation();
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100vh",
        maxHeight: "100vh",
        overflowY: "auto",
        paddingLeft: 2,
        paddingY: 2,
        backgroundColor: "inherit",
      }}
    >
      <Box>
        <Logo />
        <Box sx={{ maxHeight: "72vh", overflow: "auto" }}>
          <Box
            sx={{
              fontSize: "0.8rem",
              textTransform: "uppercase",
              fontFamily: '"Public Sans", sans-serif',
              paddingTop: "24px",
              paddingBottom: "8px",
              color: "rgb(33, 43, 54)",
            }}
          >
            <Typography
              sx={{
                fontFamily: '"Public Sans", sans-serif',
                fontWeight: 700,
                transition: "opacity 200ms cubic-bezier(0.4, 0, 0.2, 1)",
                lineHeight: "1.5",
                fontSize: "0.8rem",
                color: "rgb(100, 115, 129)",
              }}
            >
              Admin
            </Typography>
          </Box>

          <MenuList sx={{ width: "90%" }}>
            {MenuListItems.map((item) => {
              return (
                <NavLink
                  to={`${item.label}`}
                  className={({ isActive, isPending }) =>
                    isActive ? "active" : isPending ? "pending" : ""
                  }
                  end
                  children={({ isActive }) => (
                    <MenuItem
                      key={item.id}
                      selected={isActive}
                      sx={{
                        borderRadius: 3,
                        paddingY: 1.7,
                        marginBottom: 0.5,
                        "&.Mui-selected": {
                          backgroundColor: "#00AB5514",
                          color: "#00AB55",
                          fontWeight: 700,
                        },
                        "&.Mui-selected:hover": {
                          backgroundColor: "#00AB5514",
                        },
                      }}
                    >
                      <ListItemIcon
                        sx={{ color: isActive ? "#00AB55" : "#637381" }}
                      >
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText>
                        <Typography
                          sx={{
                            fontFamily: '"Public Sans", sans-serif',
                            fontSize: "14px",
                            color: isActive ? "#00AB55" : "#637381",
                            fontWeight: isActive ? 700 : "normal",
                          }}
                        >
                          {item.title}
                        </Typography>
                      </ListItemText>
                    </MenuItem>
                  )}
                />
              );
            })}
          </MenuList>
        </Box>
      </Box>

      {/* </div> */}

      <Card
        sx={{
          width: "90%",
          bgcolor: "rgba(145, 158, 171, 0.12)",
          borderRadius: 4,
          paddingLeft: 1,
          cursor: "pointer",
        }}
        elevation={0}
      >
        <CardHeader
          avatar={
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar alt="Remy Sharp" src={leetcodeImage} />
            </StyledBadge>
          }
          title="Yoseph Alemu"
          subheader="Admin"
          sx={{
            "& .MuiCardHeader-subheader": {
              margin: "0px",
              lineHeight: 1.57143,
              fontSize: "0.875rem",
              fontFamily: '"Public Sans", sans-serif',
              fontWeight: 400,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              color: "rgb(99, 115, 129)",
            },
            "& .MuiCardHeader-title": {
              fontFamily: "'Public Sans', sans-seri",
              fontWeight: 600,
              lineHeight: 1.57143,
              fontSize: "0.875rem",
              textOverflow: "ellipsis",
            },
          }}
        />
      </Card>
    </Box>
  );
}
