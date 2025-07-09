import {
  Box,
  Breadcrumbs,
  Typography,
  Link,
  Tab,
  Tabs,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Avatar,
  Chip,
} from "@mui/material";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import leetcodeImage from "../../assets/leetcode.jpg";
import CircleIcon from "@mui/icons-material/Circle";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CalendarDays } from "lucide-react";
import QuestionTable from "../questions/QuestionTable";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import {
  addContest,
  announceContest,
  getContestById,
  getSubmissionByContest,
  updateContest,
} from "@/lib/utils";
import { transformSubmission } from "@/lib/helpers";
import { DialogBox } from "./Message";
import { Loading } from "../common/Stauts";
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
      {value === index && <Box sx={{ py: 4 }}>{children}</Box>}
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
  const [school, setschool] = React.useState("");
  const [city, setcity] = React.useState("");
  // const [snakOpen, setSnakOpen] = useState(false);
  const { id } = useParams();
  console.log(id, school, city);
  const { data: contest, status } = useQuery({
    queryKey: ["contest", id],
    queryFn: async () => await getContestById(id!),
  });
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  const handleSelect = (value: any) => {
    setschool(value);
    console.log(value);
  };
  const handleSelectCity = (value: any) => {
    setcity(value);
  };

  const handleActionMade = async (
    action: string,
    time?: { start_time: string; end_time: string },
    info?: { title: string; description: string },
    data?: { file: File; message: string }
  ) => {
    if (action === "announce") {
      console.log();
      await announceContest(contest!, data!);
    } else if (action === "clone") {
      await addContest({ ...contest!, ...info! });
    } else {
      await updateContest(contest!, time!);
    }
  };
  //   const filteredSubmissons = filterContestByStudentData(questions,{school,city});
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
            {status === "success" && contest.title}
          </Link>
        </Breadcrumbs>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
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
                  cursor: "pointer",
                }}
              >
                {status === "success" && contest.title}
              </Typography>
            </HoverCardTrigger>
            <HoverCardContent className="w-[90]">
              <div
                className="space-y-1 max-w-[300px]"
                style={{ fontFamily: "'Public Sans',sans-serif" }}
              >
                <h4 className="text-sm font-semibold font-">@contest</h4>
                <p className="text-sm font-semibold">
                  {status === "success" && contest.description}
                </p>
                <div className="flex items-center pt-2 justify-between">
                  <div className="flex items-center pt-2">
                    <CalendarDays className="mr-2 h-4 w-4 opacity-70 " />{" "}
                    <span className="text-xs text-muted-foreground ">
                      Joined December 2021
                    </span>
                  </div>
                  <div>
                    <Chip
                      size="small"
                      sx={{
                        backgroundColor: "#00AB5514",
                        fontFamily: "'Public Sans',sans-serif",
                        fontWeight: 600,
                        color: "green",
                      }}
                      label="Online"
                    />
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
          <Menubar className="bg-inherit border-none cursor-pointer">
            <MenubarMenu>
              <MenubarTrigger className="cursor-pointer">
                <MoreVertIcon sx={{ color: "black", fontSize: 18 }} />
              </MenubarTrigger>
              <MenubarContent
                style={{ fontFamily: "'Public Sans',sans-serif" }}
                className="w-2"
              >
                <MenubarItem asChild>
                  <DialogBox action={"announce"} handler={handleActionMade}>
                    <button className="p-2 hover:bg-gray-100 w-full text-left text-sm">
                      Announce Contest
                    </button>
                  </DialogBox>
                </MenubarItem>
                <MenubarItem asChild>
                  <DialogBox action={"clone"} handler={handleActionMade}>
                    <button className="p-2 hover:bg-gray-100 w-full text-left text-sm">
                      Clone contest
                    </button>
                  </DialogBox>
                </MenubarItem>
                <MenubarItem asChild>
                  <DialogBox handler={handleActionMade} action="update">
                    <button className="p-2 hover:bg-gray-100 w-full text-left text-sm">
                      update time
                    </button>
                  </DialogBox>
                </MenubarItem>
                <MenubarItem className="bg-[#fff0f0] text-red-500 hover:bg-[#fff0f0] hover:text-red- ">
                  Delete contest
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </Box>
        <Box sx={{ display: "flex", gap: 3 }}>
          <Select onValueChange={handleSelect}>
            <SelectTrigger
              style={{ fontFamily: "'Public Sans',sans-serif" }}
              className="w-[180px]"
            >
              <SelectValue placeholder="Select School" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel style={{ fontFamily: "'Public Sans',sans-serif" }}>
                  School
                </SelectLabel>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select onValueChange={handleSelectCity}>
            <SelectTrigger
              style={{ fontFamily: "'Public Sans',sans-serif" }}
              className="w-[180px]"
            >
              <SelectValue placeholder="Select City" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel style={{ fontFamily: "'Public Sans',sans-serif" }}>
                  School
                </SelectLabel>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
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
          <Standing />
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={1}>
          <QuestionTable questions={contest?.questions} />
        </CustomTabPanel>
      </Box>
    </Box>
  );
}

const talbeHeader = ["Rank", "Contestant", "Solved", "Penality", "Time"];
function Standing() {
  const { id } = useParams();
  const { data: submissions = [], status } = useQuery({
    queryKey: ["submissions_by_contest"],
    queryFn: async () => getSubmissionByContest(id!),
  });
  if (status === "pending") {
    return <Loading />;
  }
  if (status === "error") {
    return <div className="">Error</div>;
  }
  const rows = transformSubmission(submissions);
  return (
    <Box>
      <TableContainer
        sx={{ backgroundColor: "inherit" }}
        elevation={0}
        component={Paper}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead
            sx={{
              backgroundColor: "rgb(244, 246, 248)",
              borderRadius: 3,
            }}
          >
            <TableRow>
              {talbeHeader.map((header) => {
                return (
                  <TableCell
                    sx={{
                      fontFamily: "'Public Sans',sans-serif",
                      borderBottom: "none",
                      fontWeight: 600,
                      color: "rgb(99, 115, 129)",
                    }}
                    align={
                      header == "Rank" || header == "Contestant"
                        ? "left"
                        : "right"
                    }
                  >
                    {header}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <Tablerow key={index} rank={{ ...row, index }} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

function Tablerow(props: any) {
  const { rank } = props;
  return (
    <TableRow sx={{ borderBottom: "none" }}>
      <TableCell
        sx={{ fontFamily: "'Public Sans',sans-serif", borderBottom: "none" }}
        align="left"
      >
        {(() => {
          const suffix =
            rank.index === 0
              ? "st"
              : rank.index === 1
              ? "nd"
              : rank.index === 2
              ? "rd"
              : "th";
          return (rank.index + 1).toString() + suffix;
        })()}
      </TableCell>
      <TableCell
        sx={{ fontFamily: "'Public Sans',sans-serif", borderBottom: "none" }}
        align="left"
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <IconButton aria-label="expand row" size="small">
            <Avatar src={leetcodeImage} />
          </IconButton>
          <Typography sx={{ fontFamily: "'Public Sans',sans-serif" }}>
            {rank.name}
          </Typography>
        </Box>
      </TableCell>
      <TableCell
        sx={{ fontFamily: "'Public Sans',sans-serif", borderBottom: "none" }}
        align="right"
      >
        {rank.solved}
      </TableCell>
      <TableCell
        sx={{ fontFamily: "'Public Sans',sans-serif", borderBottom: "none" }}
        align="right"
      >
        {rank.penality}
      </TableCell>
      <TableCell
        sx={{ fontFamily: "'Public Sans',sans-serif", borderBottom: "none" }}
        align="right"
      >
        49:03
      </TableCell>
    </TableRow>
  );
}
