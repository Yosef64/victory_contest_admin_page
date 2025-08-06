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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
  DialogTitle,
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
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Import useParams
import api from "@/services/api"; // Fixed import path
import leetcodeImage from "../../assets/leetcode.jpg";
import CircleIcon from "@mui/icons-material/Circle";
import { deleteContest } from "@/lib/utils";
import { APIContest, Student } from "@/types/models";
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
import { useQuery, useQueryClient } from "@tanstack/react-query"; // Import useQueryClient
import {
  announceContest,
  getContestById,
  getSubmissionByContest,
  updateContest,
} from "@/lib/utils";
import { transformSubmission } from "@/lib/helpers";
import { DialogBox } from "../common/DialogBox"; // Corrected import path for DialogBox
import { Loading } from "../common/Stauts";
import dayjs from "dayjs"; // Import dayjs for date formatting
import { addContest } from "@/services/contestServices";
import { getAllStudents } from "@/services/studentServices";

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
  const navigate = useNavigate();
  const queryClient = useQueryClient(); // Initialize query client
  const [tabValue, setTabValue] = React.useState(0);
  const [school, setSchool] = useState("");
  const [city, setCity] = useState("");
  const [schools, setSchools] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const { id } = useParams();

  // State for controlling dialog visibility
  const [announceDialogOpen, setAnnounceDialogOpen] = useState(false);
  const [cloneDialogOpen, setCloneDialogOpen] = useState(false);
  const [updateTimeDialogOpen, setUpdateTimeDialogOpen] = useState(false);
  // Removed isMenubarOpen state as it's not directly controlling MenubarMenu

  // Fetch schools and cities
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/api/student/grades-and-schools");
        setSchools(response.data.schools || []);
        setCities(response.data.cities || []);
      } catch (error) {
        console.error("Error fetching schools and cities:", error);
      }
    };
    fetchData();
  }, []);

  const { data: contest, status } = useQuery({
    queryKey: ["contest", id],
    queryFn: async () => await getContestById(id!),
  });

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleSelect = (value: string) => {
    setSchool(value);
  };

  const handleSelectCity = (value: string) => {
    setCity(value);
  };

  const handleDeleteContest = async () => {
    if (!contest) return;
    try {
      await deleteContest(contest.id!);
      navigate("/dashboard/contest");
    } catch (error) {
      console.error("Error deleting contest:", error);
    }
  };

  const handleActionMade = async (
    action: string,
    time?: { start_time: string; end_time: string },
    info?: { title: string; description: string },
    data?: { file: File | null; message: string }
  ) => {
    if (!contest) return;

    try {
      const contestToSend: APIContest = {
        ...contest,
        questions: contest.questions.map((q) => q.id!),
      };
      if (action === "announce") {
        await announceContest(contest, data!);
      } else if (action === "clone") {
        await addContest({ ...contestToSend, ...info! });
      } else if (action === "update" && time) {
        // Ensure the data object is passed directly, not wrapped in another 'data' key
        await updateContest(contest, {
          start_time: time.start_time,
          end_time: time.end_time,
        });
      }
      // Invalidate and refetch contest data after successful action
      queryClient.invalidateQueries({ queryKey: ["contest", id] });
    } catch (error) {
      console.error(`Error performing ${action} action:`, error);
      // Optionally, show an error message to the user
    }
  };

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleOpenDeleteDialog = () => setDeleteDialogOpen(true);
  const handleCloseDeleteDialog = () => setDeleteDialogOpen(false);

  const handleConfirmDelete = async () => {
    handleCloseDeleteDialog();
    await handleDeleteContest();
  };
  // THIS IS THE NEW FUNCTION TO HANDLE DELETION
  const handleQuestionDeleted = (deletedQuestionId: string) => {
    // setQuestions((prev) => prev.filter((q) => q.id !== deletedQuestionId));
  };

  return (
    <Box sx={{ gap: 10 }}>
      <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Delete Contest</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this contest? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

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
            {status === "success" && contest?.title}
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
                {status === "success" && contest?.title}
              </Typography>
            </HoverCardTrigger>
            <HoverCardContent className="w-[90]">
              <div
                className="space-y-1 max-w-[300px]"
                style={{ fontFamily: "'Public Sans',sans-serif" }}
              >
                <h4 className="text-sm font-semibold font-">@contest</h4>
                <p className="text-sm font-semibold">
                  {status === "success" && contest?.description}
                </p>
                <div className="flex items-center pt-2 justify-between">
                  <div className="flex items-center pt-2">
                    <CalendarDays className="mr-2 h-4 w-4 opacity-70 " />{" "}
                    <span className="text-xs text-muted-foreground ">
                      {status === "success" && contest?.date
                        ? `Scheduled: ${dayjs(contest.date).format(
                            "MMM D, YYYY"
                          )}`
                        : "Date not available"}
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
              {" "}
              {/* Removed open and onOpenChange here */}
              <MenubarTrigger className="cursor-pointer">
                <MoreVertIcon sx={{ color: "black", fontSize: 18 }} />
              </MenubarTrigger>
              <MenubarContent
                style={{ fontFamily: "'Public Sans',sans-serif" }}
                className="w-2"
              >
                <MenubarItem
                  onClick={() => {
                    setAnnounceDialogOpen(true);
                  }}
                >
                  Announce Contest
                </MenubarItem>
                <MenubarItem
                  onClick={() => {
                    setCloneDialogOpen(true);
                  }}
                >
                  Clone contest
                </MenubarItem>
                <MenubarItem
                  onClick={() => {
                    setUpdateTimeDialogOpen(true);
                  }}
                >
                  Update time
                </MenubarItem>
                <MenubarItem
                  className="bg-[#fff0f0] text-red-500 hover:bg-[#fff0f0] hover:text-red-500"
                  onClick={() => {
                    handleOpenDeleteDialog();
                  }}
                >
                  Delete contest
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </Box>
        <Box sx={{ display: "flex", gap: 3 }}>
          <Select onValueChange={handleSelect}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select School" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>School</SelectLabel>
                {schools.map((school, index) => (
                  <SelectItem key={index} value={school}>
                    {school}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select onValueChange={handleSelectCity}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select City" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>City</SelectLabel>
                {cities.map((city, index) => (
                  <SelectItem key={index} value={city}>
                    {city}
                  </SelectItem>
                ))}
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
          <Standing school={school} city={city} contest={contest} />
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={1}>
          <QuestionTable
            questions={contest?.questions ?? []}
            onQuestionDeleted={handleQuestionDeleted}
          />
        </CustomTabPanel>
      </Box>
      {/* Dialogs controlled by state */}
      <DialogBox
        action="announce"
        open={announceDialogOpen}
        onClose={() => setAnnounceDialogOpen(false)}
        handler={handleActionMade}
        contest={contest}
      />
      <DialogBox
        action="clone"
        open={cloneDialogOpen}
        onClose={() => setCloneDialogOpen(false)}
        handler={handleActionMade}
        contest={contest}
      />
      <DialogBox
        action="update"
        open={updateTimeDialogOpen}
        onClose={() => setUpdateTimeDialogOpen(false)}
        handler={handleActionMade}
        contest={contest}
      />
    </Box>
  );
}

// Updated tableHeader to include "Time Taken" and "Prize"
const tableHeader = [
  "Rank",
  "Contestant",
  "Solved",
  "Penalty",
  "Time Taken",
  "Prize",
];

interface StandingProps {
  school: string;
  city: string;
  contest?: any; // Consider defining a more specific type for contest if possible
}

function Standing({ school, city, contest }: StandingProps) {
  const { id } = useParams();
  const [studentsMap, setStudentsMap] = useState<Record<string, Student>>({});

  // Fetch student data
  useEffect(() => {
    const fetchStudents = async () => {
      const students = await getAllStudents();
      const map = students.reduce((acc: Record<string, Student>, student) => {
        acc[student.telegram_id] = student;
        return acc;
      }, {});
      setStudentsMap(map);
    };
    fetchStudents();
  }, []);

  const { data: submissions = [], status } = useQuery({
    queryKey: ["submissions_by_contest", id],
    queryFn: async () => getSubmissionByContest(id!),
  });

  if (status === "pending") {
    return <Loading />;
  }

  if (status === "error") {
    return <div className="">Error</div>;
  }

  // Assuming transformSubmission now also calculates and includes 'time_taken'
  // and that 'prize' will be passed from the contest object.
  const rows = transformSubmission(submissions);

  // Filter submissions
  const filteredRows = rows.filter((row) => {
    const student = studentsMap[row.name];
    if (!student) return false;

    const matchesSchool = !school || student.school === school;
    const matchesCity = !city || student.city === city;

    return matchesSchool && matchesCity;
  });

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography
          sx={{ fontFamily: "'Public Sans',sans-serif", fontWeight: 600 }}
        >
          Start Time: {contest?.start_time || "N/A"}
        </Typography>
        <Typography
          sx={{ fontFamily: "'Public Sans',sans-serif", fontWeight: 600 }}
        >
          End Time: {contest?.end_time || "N/A"}
        </Typography>
      </Box>
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
              {tableHeader.map((header, index) => (
                <TableCell
                  key={index}
                  sx={{
                    fontFamily: "'Public Sans',sans-serif",
                    borderBottom: "none",
                    fontWeight: 600,
                    color: "rgb(99, 115, 129)",
                  }}
                  align={
                    header === "Rank" || header === "Contestant"
                      ? "left"
                      : "right"
                  }
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row, index) => (
              <TableRowComponent
                key={index}
                rank={{ ...row, index }}
                contestPrize={contest?.prize || "N/A"} // Pass contest prize to each row
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

interface TableRowProps {
  rank: {
    index: number;
    name: string;
    solved: number;
    penalty: number; // Changed from 'penality' to 'penalty'
    time_taken?: string; // Assuming transformSubmission provides this
  };
  contestPrize: string; // Prize from the contest object
}

function TableRowComponent({ rank, contestPrize }: TableRowProps) {
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
        {rank.penalty} {/* Changed from 'rank.penality' to 'rank.penalty' */}
      </TableCell>
      {/* New TableCell for Time Taken */}
      <TableCell
        sx={{ fontFamily: "'Public Sans',sans-serif", borderBottom: "none" }}
        align="right"
      >
        {rank.time_taken || "N/A"}{" "}
        {/* Display time_taken if available, otherwise 'N/A' */}
      </TableCell>
      {/* New TableCell for Prize */}
      <TableCell
        sx={{ fontFamily: "'Public Sans',sans-serif", borderBottom: "none" }}
        align="right"
      >
        {contestPrize}
      </TableCell>
    </TableRow>
  );
}
