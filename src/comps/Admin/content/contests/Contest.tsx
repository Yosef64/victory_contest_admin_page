import {
  MenuList,
  Box,
  Typography,
  TextField,
  MenuItem,
  FormControlLabel,
  Autocomplete,
  Chip,
} from "@mui/material";
import React, { useState } from "react";

import Checkbox from "@mui/material/Checkbox";
import RankingAndContest from "./RankingAndContest.tsx";

// interface OptionType {
//   label: string;
//   value: string;
//   children?: OptionType[];
// }

export default function Contest() {
  const fixedOptions: { title: string; year: number | JSX.Element }[] = [];
  const [value, setValue] = useState([...fixedOptions]);
  const fixedSchool: { title: string; year: number | JSX.Element }[] = [];
  const [subjectValue, setsubjectValue] = useState([...fixedSchool]);

  console.log(subjectValue, value);

  return (
    <Box sx={{ paddingX: 2, paddingY: 2, overflow: "auto" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          mb: 5,
        }}
      >
        <Typography
          sx={{
            fontFamily: '"Public Sans", sans-serif',
            fontSize: 25,
            fontWeight: 700,
          }}
        >
          Contests
        </Typography>
        <Typography
          sx={{
            fontSize: "0.875rem",
            color: "rgb(145, 158, 171)",
            fontFamily: '"Public Sans", sans-serif',
          }}
        >
          Ranking and Contests
        </Typography>
      </Box>
      <Box sx={{ display: "flex", gap: 5, width: "90%", mb: 4 }}>
        <Autocomplete
          multiple
          id="fixed-tags-demo"
          value={value}
          onChange={(event, newValue) => {
            setValue([
              ...fixedOptions,
              ...newValue.filter((option) => !fixedOptions.includes(option)),
            ]);
          }}
          options={top100Films}
          getOptionLabel={(option) => option.title}
          renderOption={(props, option, { selected }) => (
            <MenuItem
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "#00AB5514",
                  color: "#00AB55",
                  fontWeight: 700,
                },
                borderRadius: 3,
                margin: 1,
                fontFamily: '"Public Sans", sans-serif',
              }}
              // {...props}
              onClick={(event) => {
                event.stopPropagation();
                if (selected) {
                  setValue((prev) => prev.filter((item) => item !== option));
                } else {
                  setValue((prev) => [...prev, option]);
                }
              }}
              selected={selected}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selected}
                    inputProps={{ "aria-label": option.title }}
                    color="success"
                  />
                }
                label={`${option.title}`}
                sx={{
                  ".MuiFormControlLabel-label": {
                    fontSize: 16,
                    fontWeight: selected ? 700 : "normal",
                    fontFamily: '"Public Sans", sans-serif',
                  },
                }}
              />
            </MenuItem>
          )}
          renderTags={(tagValue, getTagProps) =>
            tagValue.map((option, index) => {
              const { key, ...tagProps } = getTagProps({ index });
              return (
                <Chip
                  key={key}
                  label={option.title}
                  {...tagProps}
                  disabled={fixedOptions.includes(option)}
                />
              );
            })
          }
          style={{ width: 500 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Grades"
              InputLabelProps={{
                sx: {
                  fontFamily: "'Public Sans', sans-serif",
                  fontWeight: 500,
                  fontSize: "16px",
                  "&.Mui-focused": {
                    color: "green",
                  },
                },
              }}
              // InputProps={{
              //   sx: {
              //     "&.Mui-focused ": {
              //       borderColor: "green",
              //       color: "green",
              //     },
              //   },
              // }}
            />
          )}
          disableCloseOnSelect
        />
        <Autocomplete
          multiple
          id="fixed-tags-demo"
          value={subjectValue}
          onChange={(event, newValue) => {
            setsubjectValue([
              ...fixedSchool,
              ...newValue.filter((option) => !fixedSchool.includes(option)),
            ]);
          }}
          options={subject}
          getOptionLabel={(option) => option.title}
          renderOption={(props, option, { selected }) => (
            <MenuItem
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "#00AB5514",
                  color: "#00AB55",
                  fontWeight: 700,
                },
                borderRadius: 3,
                margin: 1,
                fontFamily: '"Public Sans", sans-serif',
              }}
              onClick={(event) => {
                event.stopPropagation();
                if (selected) {
                  setsubjectValue((prev) =>
                    prev.filter((item) => item !== option)
                  );
                } else {
                  setsubjectValue((prev) => [...prev, option]);
                }
              }}
              selected={selected}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selected}
                    inputProps={{ "aria-label": option.title }}
                    color="success"
                  />
                }
                label={`${option.title}`}
                sx={{
                  ".MuiFormControlLabel-label": {
                    fontSize: 16,
                    fontWeight: selected ? 700 : "normal",
                    fontFamily: '"Public Sans", sans-serif',
                  },
                }}
              />
            </MenuItem>
          )}
          renderTags={(tagValue, getTagProps) =>
            tagValue.map((option, index) => {
              const { key, ...tagProps } = getTagProps({ index });
              return (
                <Chip
                  key={key}
                  label={option.title}
                  {...tagProps}
                  disabled={fixedSchool.includes(option)}
                />
              );
            })
          }
          style={{ width: 500 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Subject"
              InputLabelProps={{
                sx: {
                  fontFamily: "'Public Sans', sans-serif",
                  fontWeight: 500,
                  fontSize: "16px",
                },
              }}
            />
          )}
          disableCloseOnSelect
        />
      </Box>
      <RankingAndContest grade={value} school={subjectValue} />
    </Box>
  );
}
const top100Films = [
  {
    title: "Grade 12",
    year: 0,
  },
  {
    title: "Grade 11",
    year: 0,
  },
];
const subject = [
  {
    title: "Science",
    year: 0,
  },
  {
    title: "Science",
    year: 0,
  },
];
