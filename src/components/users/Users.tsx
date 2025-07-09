import {
  Box,
  IconButton,
  InputAdornment,
  Paper,
  TableBody,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Avatar,
  Chip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import { filterStudentByCityAndGrade } from "../../lib/studentFilter";
import { Student } from "../../types/models";
import { getAllStudents } from "@/lib/utils";
import { Loading } from "../common/Stauts";
import { Tooltip } from "@mui/material";
import ErrorComponent from "../common/Stauts";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.action.hover,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const header = ["Name", "Grade", "City", "Gender"];
const grades = ["Grade 12", "Grade 11", "Grade 10", "Default"];
const cities = ["Adama", "Addis Ababa", "Dire Dewa", "Bishoftu", "Default"];
const schools = [
  "Hawas",
  "Kebena secondary School",
  "Excel secondary school",
  "Default",
];
export default function Users() {
  const [selectedGrade, setSelectedGrade] = React.useState("default");
  const [selectedCity, setselectedCity] = React.useState("default");
  const [selectedSchool, setselectedSchool] = React.useState("default");
  const [students, setStudent] = useState<Student[]>([]);
  const [status, setStatus] = useState("pending");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      setStatus("pending");
      try {
        const students = await getAllStudents();
        setStudent(students);
        setStatus("success");
      } catch (error) {
        setStatus("error");
      }
    };
    fetchStudents();
  }, []);

  const handleGradeChange = (value: string) => {
    setSelectedGrade(value);
  };
  const handleSchoolChange = (value: string) => {
    setselectedSchool(value);
  };
  const handlecityChange = (value: string) => {
    setselectedCity(value);
  };
  // Add search filter
  const filteredStudents = filterStudentByCityAndGrade(students, {
    selectedCity,
    selectedGrade,
    selectedSchool,
  }).filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <Box sx={{ display: "flex", flexDirection: "column", p: 2 }}>
      <Box sx={{}}>
        <Typography
          sx={{
            fontFamily: '"Public Sans", sans-serif',
            fontSize: 25,
            fontWeight: 700,
            mb: 1,
          }}
        >
          Users
        </Typography>
        <Typography
          sx={{
            fontSize: "0.875rem",
            color: "rgb(145, 158, 171)",
            fontFamily: '"Public Sans", sans-serif',
          }}
        >
          All
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          // bgcolor: "gray",
          alignItems: "center",
          width: "100%",
          mt: 3,
        }}
      >
        <TextField
          label=""
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          id="outlined-start-adornment"
          sx={{
            m: 1,
            width: "25ch",
            height: 50,
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
              "&.Mui-focused fieldset": {
                border: "1px solid gray",
                width: 300,
              },
            },
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      role="img"
                      width="0.7em"
                      height="0.7em"
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
                </InputAdornment>
              ),
              style: { height: 50 },
            },
          }}
          inputProps={{
            style: { fontFamily: '"Public Sans",sans-serif' },
          }}
        />
        <Box sx={{ display: "flex", gap: 2 }}>
          <Select onValueChange={handleGradeChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a grade" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Grade</SelectLabel>
                {grades.map((grade: string, index: number) => {
                  return (
                    <SelectItem key={index} value={grade.toLowerCase()}>
                      {grade}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select onValueChange={handlecityChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a City" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Grade</SelectLabel>
                {cities.map((grade: string, index: number) => {
                  return (
                    <SelectItem key={index} value={grade.toLowerCase()}>
                      {grade}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select onValueChange={handleSchoolChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a school" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Grade</SelectLabel>
                {schools.map((grade: string, index: number) => {
                  return (
                    <SelectItem key={index} value={grade.toLowerCase()}>
                      {grade}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Box>
      </Box>
      {/* <Box> */}

      <TableContainer
        elevation={0}
        component={Paper}
        sx={{
          flex: 1,
          borderRadius: 3,
          width: "99%",
        }}
      >
        {status === "success" ? (
          <Table>
            <TableHead>
              <TableRow>
                {[...header, "Payment", "Info"].map((header, index) => (
                  <StyledTableCell
                    key={index}
                    sx={{
                      fontFamily: "'Public Sans',sans-serif",
                      fontSize: "0.9rem",
                    }}
                    align={header == "Name" ? "left" : "right"}
                  >
                    {header}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredStudents.map((row, index) => (
                <Row key={index} student={row} />
              ))}
            </TableBody>
          </Table>
        ) : status === "pending" ? (
          <Loading />
        ) : (
          <ErrorComponent />
        )}
      </TableContainer>
      {/* </Box> */}
    </Box>
  );
}

function Row({ student }: { student: Student }) {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <StyledTableRow
        sx={{
          cursor: "pointer",
          "&:hover": { backgroundColor: "#f7f7f5" },
        }}
      >
        <StyledTableCell align="right">
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <IconButton aria-label="expand row" size="small">
              <Avatar src={student.imgurl} />
            </IconButton>
            <Tooltip
              title="Go to profile"
              sx={{ fontFamily: '"Public Sans",sans-serif' }}
            >
              <Typography
                sx={{
                  fontFamily: "'Public Sans',sans-serif",
                  color: "black",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
                onClick={() =>
                  navigate(`/dashboard/user/${student.telegram_id}`)
                }
              >
                {student.name}
              </Typography>
            </Tooltip>
          </Box>
        </StyledTableCell>
        <StyledTableCell
          sx={{ fontFamily: "'Public Sans',sans-serif" }}
          align="right"
        >
          {student.grade}
        </StyledTableCell>
        <TableCell
          sx={{ fontFamily: "'Public Sans',sans-serif" }}
          align="right"
        >
          {student.city}
        </TableCell>
        <TableCell
          sx={{ fontFamily: "'Public Sans',sans-serif" }}
          align="right"
        >
          {student.sex}
        </TableCell>
        <TableCell align="right">
          {(() => {
            const paymentDate = student.payment?.payment_date
              ? new Date(student.payment.payment_date)
              : null;
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            let label = "Unpaid";
            let color: "success" | "error" | "default" = "error";
            if (paymentDate) {
              paymentDate.setHours(0, 0, 0, 0);
              if (paymentDate >= today) {
                label = "Paid";
                color = "success";
              } else {
                label = "Expired";
                color = "error";
              }
            }
            return (
              <Chip
                label={label}
                color={color}
                size="small"
                sx={{ fontWeight: 600, fontFamily: '"Public Sans",sans-serif' }}
              />
            );
          })()}
        </TableCell>
        <TableCell align="right">
          <Tooltip title="View Info">
            <IconButton
              onClick={() => navigate(`/dashboard/user/${student.telegram_id}`)}
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                <path
                  fill="#00AB55"
                  d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16Zm0-7a1 1 0 0 1-1-1V9a1 1 0 1 1 2 0v3a1 1 0 0 1-1 1Zm0 4a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Z"
                />
              </svg>
            </IconButton>
          </Tooltip>
        </TableCell>
      </StyledTableRow>
    </React.Fragment>
  );
}
