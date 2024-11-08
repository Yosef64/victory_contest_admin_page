import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  FormControl,
  MenuItem,
  OutlinedInput,
  Select,
  TablePagination,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { CheckBox } from "@mui/icons-material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

const questions = [
  {
    question_id: 1,
    question_text: "What is You name?",
    choices: ["Yoseph", "Johnny sinner", "Tewodros"],
    answer: "Yoseph",
    exp: "Because It's my name",
    chapter: 1,
    grade: 12,
    contest: 1,
    sub: "Biology",
  },
  {
    question_id: 2,
    question_text:
      "What is You name? What is You name? What is You name? What is You name? What is You name?What is You name? What is You name?",
    choices: ["Yoseph", "Johnny sinner", "Tewodros"],
    answer: "Yoseph",
    exp: "Because It's my name",
    chapter: 1,
    grade: 12,
    contest: 1,
    sub: "Biology",
  },
  {
    question_id: 3,
    question_text: "What is You name?",
    choices: ["Yoseph", "Johnny sins", "Tewodros"],
    answer: "Yoseph",
    exp: "Because It's my name",
    chapter: 1,
    grade: 12,
    contest: 1,
    sub: "Biology",
  },
];
const header = ["Question", "Chapter", "Grade", "Subject"];

export default function Questions() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const theme = useTheme();
  const [subjectsname, setPersonName] = React.useState([]);
  const [gradename, setGradeName] = React.useState([]);

  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
  };
  const handleChangeGrade = (event: any) => {
    const {
      target: { value },
    } = event;
    setGradeName(typeof value === "string" ? value.split(",") : value);
  };
  const handleChangePage = (event:any,newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ mt: 4 }}>
        <Typography
          sx={{
            fontFamily: '"Public Sans", sans-serif',
            fontSize: 25,
            fontWeight: 700,
            mb: 1,
          }}
        >
          Questions
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
      <Box>
        <FormControl sx={{ m: 1, width: 200, mt: 3 }}>
          <Select
            multiple
            displayEmpty
            value={subjectsname}
            onChange={handleChange}
            input={
              <OutlinedInput
                sx={{
                  fontFamily: "'Public Sans',sans-serifs",
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#00AB55",
                  },
                }}
              />
            }
            renderValue={(selected) => {
              if (selected.length === 0) {
                return (
                  <Typography sx={{ fontFamily: "'Public Sans',sans-serif" }}>
                    Subject
                  </Typography>
                );
              }

              return selected.join(", ");
            }}
            MenuProps={MenuProps}
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem disabled value="">
              <em style={{ fontFamily: "'Public Sans',sans-serif" }}>
                Subjects
              </em>
            </MenuItem>
            {names.map((name) => (
              <MenuItem
                key={name}
                value={name}
                sx={{
                  "&.Mui-selected": {
                    backgroundColor: "#00AB5514",
                    color: "#00AB55",
                    fontWeight: 700,
                  },
                  "&:hover": {
                    backgroundColor: "#00AB5514",
                  },
                  mx: 1,
                  mb: 1,
                  p: 2,
                  borderRadius: 2,
                  fontFamily: "'Public Sans',sans-serif",
                }}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, width: 200, mt: 3 }}>
          <Select
            multiple
            displayEmpty
            value={gradename}
            onChange={handleChangeGrade}
            input={
              <OutlinedInput
                sx={{
                  fontFamily: "'Public Sans',sans-serifs",
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#00AB55",
                  },
                }}
              />
            }
            renderValue={(selected) => {
              if (selected.length === 0) {
                return (
                  <Typography sx={{ fontFamily: "'Public Sans',sans-serif" }}>
                    Grade
                  </Typography>
                );
              }

              return selected.join(", ");
            }}
            MenuProps={MenuProps}
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem disabled value="">
              <em style={{ fontFamily: "'Public Sans',sans-serif" }}>Grade</em>
            </MenuItem>
            {names.map((name) => (
              <MenuItem
                key={name}
                value={name}
                sx={{
                  "&.Mui-selected": {
                    backgroundColor: "#00AB5514",
                    color: "#00AB55",
                    fontWeight: 700,
                  },
                  "&:hover": {
                    backgroundColor: "#00AB5514",
                  },
                  mx: 1,
                  mb: 1,
                  p: 2,
                  borderRadius: 2,
                  fontFamily: "'Public Sans',sans-serif",
                }}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <TableContainer
        elevation={0}
        component={Paper}
        sx={{
          // flex: 1,
          borderRadius: 3,
          width: "99%",
          backgroundColor: "inherit",
        }}
      >
        <Table stickyHeader aria-label="collapsible table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#c7c7c7 " }}>
              <TableCell />
              {header.map((header, index) => (
                <TableCell
                  key={index}
                  sx={{
                    fontFamily: "'Public Sans',sans-serif",
                    fontSize: "0.9rem",
                  }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {questions
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <Row key={index} row={row} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={questions.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          "&.MuiTablePagination-selectLabel": {
            fontFamily: "'Public Sans',sans-serif",
            fontSize: "0.875rem",
          },
          overflow: "hidden",
        }}
      />
    </div>
  );
}

function Row(props:any) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow
        sx={{
          "& > *": { borderBottom: "unset" },
          cursor: "pointer",
          "&:hover": { backgroundColor: "#f7f7f5" },
        }}
        onClick={() => setOpen(!open)}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell
          sx={{ fontFamily: "'Public Sans',sans-serif" }}
          component="th"
          scope="row"
        >
          {row.question_text}
        </TableCell>
        <TableCell sx={{ fontFamily: "'Public Sans',sans-serif" }} align="left">
          {row.chapter}
        </TableCell>
        <TableCell sx={{ fontFamily: "'Public Sans',sans-serif" }} align="left">
          {row.grade}
        </TableCell>
        <TableCell sx={{ fontFamily: "'Public Sans',sans-serif" }} align="left">
          {row.sub}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Card
              elevation={0}
              sx={{ my: 0.8, borderRadius: 3, boxShadow: "0 0 1px #9c9898" }}
            >
              <CardHeader
                title={"Q. " + row.question_text}
                action={
                  <Button
                    sx={{
                      fontFamily: "'Public Sans',sans-serif",
                      textTransform: "none",
                      // backgroundColor: "#00AB5514",
                      color: "#00AB55",
                      fontWeight: 600,
                    }}
                  >
                    Edit
                  </Button>
                }
                sx={{
                  "& .MuiCardHeader-title": {
                    fontFamily: "'Public Sans', sans-seri",
                    fontWeight: 600,
                    lineHeight: 1.57143,
                    fontSize: 15,
                    textOverflow: "ellipsis",
                  },
                }}
              />
              <CardContent>
                {row.choices.map((choice:string) => {
                  return (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        padding: 0,
                      }}
                    >
                      <Checkbox
                        checked={true}
                        sx={{
                          "&.Mui-checked": {
                            color: "#00AB55",
                          },
                        }}
                      />
                      <Typography
                        sx={{
                          fontFamily: '"Public Sans",sans-serif',
                        }}
                      >
                        {choice}
                      </Typography>
                    </Box>
                  );
                })}
              </CardContent>
              <CardActions
                sx={{
                  backgroundColor: "#00AB5514",
                  fontFamily: "'Public Sans',sans-serif",
                }}
              >
                <Box>
                  <span
                    style={{
                      color: "#00AB55",
                      fontWeight: 700,
                    }}
                  >
                    Explanation
                  </span>{" "}
                  : {row.exp}
                </Box>
              </CardActions>
            </Card>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
