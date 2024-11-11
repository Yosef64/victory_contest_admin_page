import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";

import { FormControl, MenuItem, OutlinedInput, Select } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { CheckBox } from "@mui/icons-material";
import QuestionTable from "./QuestionTable";

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
                  height: 50,
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
                  height: 50,
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
      <QuestionTable questions={questions} />
    </div>
  );
}
