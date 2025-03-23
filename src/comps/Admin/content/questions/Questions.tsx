import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { FormControl, MenuItem, OutlinedInput, Select } from "@mui/material";

import QuestionTable from "./QuestionTable";
import { grades, Subjects } from "./Data";
import { getQuestions } from "@/lib/utils";
import { Question } from "../models";
import { Loading } from "../Stauts";

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

export default function Questions() {
  const [subjectsname, setPersonName] = React.useState<string[]>([]);
  const [gradename, setGradeName] = React.useState<string[]>([]);
  const [status, setStatus] = React.useState("pending");
  const [questions, setquestions] = React.useState<Question[]>([]);
  React.useEffect(() => {
    const fetchQuestion = async () => {
      setStatus("pending");
      try {
        const data = await getQuestions();
        setquestions(data);
        setStatus("success");
      } catch (error) {
        setStatus("error");
      }
    };
    fetchQuestion();
  }, []);

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
  const filteredQuestion = questions.filter(
    (x) =>
      (gradename.length === 0 && subjectsname.length === 0) ||
      subjectsname.includes(x.subject) ||
      gradename.includes(x.grade)
  );

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
            {Subjects.map((name) => (
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
            {grades.map((name, index) => (
              <MenuItem
                key={index}
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
      {status == "pending" ? (
        <Loading />
      ) : (
        <QuestionTable status={status} questions={filteredQuestion} />
      )}
    </div>
  );
}
