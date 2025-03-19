import { MenuListItems } from "./Sidentmenu.tsx";
import Logo from "./Logo.tsx";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useRef, useState } from "react";

export default function Sidebar() {
  const location = useLocation();
  return (
    <div className="relative w-full h-screen bg-gray-100 overflow-auto">
      <div className="h-full w-full ">
        <div className="flex pr-2 h-full flex-grow flex-col overflow-y-auto rounded-br-lg rounded-tr-lg bg-white pt-5 shadow-md">
          <Logo />

          <span className="ml-3 mt-2 mb-2 block text-xs font-semibold text-gray-500">
            Admin
          </span>

          <div className="flex mt-2 flex-1 flex-col">
            <div className="">
              <nav className="flex-1">
                {MenuListItems.map((item, index) => {
                  const isActive = location.pathname === item.path;
                  if (isActive) {
                    console.log(location.pathname, item.path);
                  }
                  return (
                    <Link
                      key={index}
                      to={item.path}
                      className={`flex rounded-md py-4 mb-2 cursor-pointer items-center  px-4 text-sm   outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-[#00AB55] hover:text-[#00AB55] ${
                        isActive
                          ? "border-l-4 bg-[#00AB5514] border-l-[#00AB55] text-[#00AB55] font-bold"
                          : "border-l-0 text-gray-600 font-medium"
                      }`}
                    >
                      {item.icon}
                      {item.title}
                    </Link>
                  );
                })}
              </nav>
            </div>
            <DropdownMenu />
          </div>
        </div>
      </div>
    </div>
  );
}

const DropdownMenu = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const menuRef = useRef(null);

  return (
    <div className="absolute bottom-0">
      {/* Button to toggle menu */}
      <button
        type="button"
        className={`flex w-full items-center rounded-radius gap-2 p-2 text-left text-on-surface hover:bg-primary/5 hover:text-on-surface-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:text-on-surface-dark dark:hover:bg-primary-dark/5 dark:hover:text-on-surface-dark-strong dark:focus-visible:outline-primary-dark ${
          menuIsOpen ? "bg-primary/10 dark:bg-primary-dark/10" : ""
        }`}
        aria-haspopup="true"
        aria-expanded={menuIsOpen}
        onClick={() => setMenuIsOpen(!menuIsOpen)}
      >
        <img
          src="https://penguinui.s3.amazonaws.com/component-assets/avatar-7.webp"
          className="size-8 object-cover rounded-radius"
          alt="avatar"
          aria-hidden="true"
        />
        <div className="flex flex-col">
          <span className="text-sm font-bold text-on-surface-strong dark:text-on-surface-dark-strong">
            Alex Martinez
          </span>
          <span
            className="w-32 overflow-hidden text-ellipsis text-xs md:w-36"
            aria-hidden="true"
          >
            @alexmartinez
          </span>
          <span className="sr-only">profile settings</span>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          stroke="currentColor"
          fill="none"
          strokeWidth="2"
          className="ml-auto size-4 shrink-0 -rotate-90 md:rotate-0"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>

      {/* Dropdown menu */}
      {menuIsOpen && (
        <div
          ref={menuRef}
          className="absolute bottom-20 right-6 z-20 -mr-1 w-48 border divide-y divide-outline border-outline bg-surface dark:divide-outline-dark dark:border-outline-dark dark:bg-surface-dark rounded-radius md:-right-44 md:bottom-4"
          role="menu"
        >
          <div className="flex flex-col py-1.5">
            <NavLink
              to="#"
              className="flex items-center gap-2 px-2 py-1.5 text-sm font-medium text-on-surface underline-offset-2 hover:bg-primary/5 hover:text-on-surface-strong focus-visible:underline focus:outline-hidden dark:text-on-surface-dark dark:hover:bg-primary-dark/5 dark:hover:text-on-surface-dark-strong"
              role="menuitem"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-5 shrink-0"
                aria-hidden="true"
              >
                <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z" />
              </svg>
              <span>Profile</span>
            </NavLink>
          </div>
          {/* Additional menu items would go here */}
        </div>
      )}
    </div>
  );
};
{
  /* <Box
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

      {/* </div> */
}

{
  /* <Card
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
    </Box> */
}
