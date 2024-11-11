import { Box, Button, Typography } from "@mui/material";
import React from "react";
import CustomizedDataGrid from "../home/CustomizedDataGrid";
import { GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { DatePickerDemo, TimePickerComponent } from "./DatePicker";

export const columns: GridColDef[] = [
  {
    field: "question",
    headerName: "Question",
    flex: 1.5,
    minWidth: 200,
    headerAlign: "left",
    align: "left",
  },
  {
    field: "chapter",
    headerName: "Chapter",
    flex: 0.5,
    minWidth: 80,
    headerAlign: "left",
    align: "left",
  },
  {
    field: "grade",
    headerName: "Grade",
    headerAlign: "left",
    align: "left",
    flex: 1,
    minWidth: 80,
  },
  {
    field: "subject",
    headerName: "Subject",
    headerAlign: "left",
    align: "left",
    flex: 1,
    minWidth: 100,
  },
];

interface row {
  id: number;
  question: string;
  subject: string;
  chapter: number;
  grade: number;
}
export const rows: GridRowsProp = [
  {
    id: 1,
    question: "Homepage Overview",
    subject: "Math",
    chapter: 1,
    grade: 12,
  },
  {
    id: 2,
    question: "Homepage Overview",
    subject: "Math",
    chapter: 1,
    grade: 11,
  },
  {
    id: 3,
    question: "Homepage Overview",
    subject: "Math",
    chapter: 1,
    grade: 12,
  },
];
export default function AddContest(params: any) {
  const [selectedRows, setSelectedRows] = React.useState([]);

  const handleSelectionChange = (newSelection: row) => {
    console.log(newSelection);

    setSelectedRows((prevSelectedRows: any) => {
      const isAlreadySelected = prevSelectedRows.some(
        (row: row) => row.id === newSelection.id
      );

      if (isAlreadySelected) {
        return prevSelectedRows.filter(
          (row: row) => row.id !== newSelection.id
        );
      } else {
        return [...prevSelectedRows, newSelection];
      }
    });
  };

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ mb: 4 }}>
        <Typography
          sx={{
            fontFamily: "'Public Sans',sans-serif",
            fontSize: 18,
            fontWeight: 700,
          }}
        >
          Add Contest
        </Typography>
      </Box>
      <Box sx={{ mb: 3 }}>
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: 15,
            mb: 3,
            color: "rgb(99, 115, 129)",
          }}
        >
          Choose Questions
        </Typography>
        <CustomizedDataGrid
          value={{ rows, columns }}
          onSelectionChange={handleSelectionChange}
        />
      </Box>
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: 17,
          fontFamily: "'Public Sans',sans-serif",
          mb: 3,
          color: "rgb(99, 115, 129)",
        }}
      >
        Schedule Date
      </Typography>
      <Box sx={{ display: "flex", gap: "5%", mb: 3 }}>
        <Box>
          <Typography
            sx={{
              color: "rgb(99, 115, 129)",
              fontFamily: "'Public Sans',sans-serif",
              fontSize: 14,
            }}
          >
            Date
          </Typography>
          <DatePickerDemo />
        </Box>
        <Box>
          <Typography
            sx={{
              color: "rgb(99, 115, 129)",
              fontFamily: "'Public Sans',sans-serif",
              fontSize: 14,
            }}
          >
            Time
          </Typography>
          <TimePickerComponent />
        </Box>
      </Box>

      <Box>
        <Button
          variant="contained"
          sx={{ bgcolor: "#00AB55", textTransform: "none", fontWeight: 600 }}
          // onClick={}
        >
          Add Contest
        </Button>
      </Box>
    </Box>
  );
}
