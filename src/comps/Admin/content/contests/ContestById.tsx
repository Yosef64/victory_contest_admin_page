import { Box, Breadcrumbs, Typography, Link, Tab, Tabs } from "@mui/material";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
// import { Link } from 'react-router-dom'
import CircleIcon from "@mui/icons-material/Circle";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CalendarDays } from "lucide-react";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
export default function ContestById() {
  const [tabValue, setTabValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  return (
    <Box sx={{ gap: 10 }}>
      <Box sx={{ mb: 5 }}>
        <Typography
          sx={{
            fontFamily: "'Public Sans',sans-serif",
            fontWeight: 700,
            fontSize: 25,
          }}
        >
          Contest
        </Typography>
        <Breadcrumbs separator={<CircleIcon sx={{ fontSize: 10 }} />}>
          <Link
            sx={{
              fontFamily: "'Public Sans',sans-serif",
              fontSize: 13,
              fontWeight: 600,
              textDecoration: "none",
            }}
            color="inherit"
            href="/dashboard/contest"
          >
            Contest
          </Link>
          <Link
            sx={{
              fontFamily: "'Public Sans',sans-serif",
              fontSize: 13,
              fontWeight: 600,
              textDecoration: "none",
            }}
            color="inherit"
          >
            Contest Number One
          </Link>
        </Breadcrumbs>
      </Box>
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            "&:hover": { backgroundColor: "#F6F3F3FF" },
            width: "40%",
            borderRadius: 3,
            paddingX: 1,
            paddingY: 2,
          }}
        >
          <HoverCard>
            <HoverCardTrigger>
              <Typography
                sx={{
                  fontFamily: "'Public Sans',sans-serif",
                  fontSize: 20,
                  fontWeight: 600,
                }}
              >
                Contest Number One
              </Typography>
            </HoverCardTrigger>
            <HoverCardContent className="w-70">
              <div
                className="space-y-1 f"
                style={{ fontFamily: "'Public Sans',sans-serif" }}
              >
                <h4 className="text-sm font-semibold font-">@nextjs</h4>
                <p className="text-sm font-semibold">
                  The React Framework – created and maintained by @vercel.
                </p>
                <div className="flex items-center pt-2">
                  <CalendarDays className="mr-2 h-4 w-4 opacity-70 " />{" "}
                  <span className="text-xs text-muted-foreground ">
                    Joined December 2021
                  </span>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>

          <Menubar className="bg-inherit border-none cursor-pointer">
            <MenubarMenu>
              <MenubarTrigger className="cursor-pointer">
                <MoreVertIcon sx={{ color: "black", fontSize: 18 }} />
              </MenubarTrigger>
              <MenubarContent>
                <MenubarItem>
                  New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                </MenubarItem>
                <MenubarItem>New Window</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Share</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Print</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </Box>
      </Box>
      <Box sx={{ width: "100%" }}>
        <Box>
          <Tabs
            value={tabValue}
            onChange={handleChange}
            aria-label="basic tabs example"
            sx={{
              "& .MuiTabs-indicator": {
                backgroundColor: "#00AB55",
              },
              borderBottom: "none",
            }}
          >
            <Tab
              sx={{
                "&.MuiTab-root": {
                  fontFamily: "'Public Sans',sans-serif",
                  textTransform: "none",
                  fontWeight: 600,
                },
                padding: 0,
                mr: 4,
                "&.Mui-selected": {
                  color: "black",
                },
              }}
              label="Standings"
              {...a11yProps(0)}
            />
            <Tab
              sx={{
                "&.MuiTab-root": {
                  fontFamily: "'Public Sans',sans-serif",
                  textTransform: "none",
                  fontWeight: 600,
                },
                "&.Mui-selected": {
                  color: "black",
                },
              }}
              label="Problems"
              {...a11yProps(1)}
            />
          </Tabs>
        </Box>
        <CustomTabPanel value={tabValue} index={0}>
          Item One
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={1}>
          Item Two
        </CustomTabPanel>
      </Box>
    </Box>
  );
}
