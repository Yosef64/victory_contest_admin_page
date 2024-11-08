import {
  Box,
  Collapse,
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
} from "@mui/material";
import leetcodeImage from "../../../../assets/leetcode.jpg";
import React from "react";
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

interface Student {
  name: string;
  grade: number;
  ranking: number;
}
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
const students: Student[] = [
  {
    name: "John Doe",
    grade: 85,
    ranking: 1,
  },
  {
    name: "John Doe",
    grade: 85,
    ranking: 1,
  },
  {
    name: "John Doe",
    grade: 85,
    ranking: 1,
  },
];

const header = ["Name", "Grade", "Ranking"];

export default function Users() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ mt: 4 }}>
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
          width: "95%",
          mt: 5,
        }}
      >
        <TextField
          label=""
          placeholder="Search..."
          id="outlined-start-adornment"
          sx={{
            m: 1,
            width: "25ch",

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
            },
          }}
          inputProps={{
            style: { fontFamily: '"Public Sans",sans-serif' },
          }}
        />
        <Select>
          <SelectTrigger
            className="w-[180px]"
            style={
              {
                // border: "1px solid green",
              }
            }
          >
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
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
        <Table>
          <TableHead>
            <TableRow>
              {header.map((header, index) => (
                <StyledTableCell
                  key={index}
                  sx={{
                    fontFamily: "'Public Sans',sans-serif",
                    fontSize: "0.9rem",
                  }}
                  align={header == "Name" ? "left" : "center"}
                >
                  {header}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((row, index) => (
              <Row key={index} student={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* </Box> */}
    </Box>
  );
}

function Row({ student }: { student: Student }) {
  return (
    <React.Fragment>
      <StyledTableRow
        sx={{
          cursor: "pointer",
          "&:hover": { backgroundColor: "#f7f7f5" },
        }}
      >
        {/* <TableCell>
          
        </TableCell> */}

        <StyledTableCell
          // component="th"
          scope="row"
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
              {student.name}
            </Typography>
          </Box>
        </StyledTableCell>

        <StyledTableCell
          sx={{ fontFamily: "'Public Sans',sans-serif" }}
          align="center"
        >
          {student.grade}
        </StyledTableCell>
        <TableCell
          sx={{ fontFamily: "'Public Sans',sans-serif" }}
          align="center"
        >
          {student.ranking}
        </TableCell>
      </StyledTableRow>
    </React.Fragment>
  );
}
