import {
  Box,
  Button,
  Grid,
  Grid2,
  SnackbarCloseReason,
  Typography,
} from "@mui/material";
import React from "react";
import CustomizedDataGrid from "../home/CustomizedDataGrid";
import { GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { DatePickerDemo, TimePickerComponent } from "./DatePicker";
import LoadingButton from "@mui/lab/LoadingButton";
import SnackBar from "../questions/Snackbar";

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
  const [isLoading, setIsLoading] = React.useState(false);
  const [startTime, setStartTimeSelected] = React.useState("");
  const [date, setDate] = React.useState<Date>(new Date());
  const [addStatus, setaddStatus] = React.useState(200);
  const [snakOpen, setSnakOpen] = React.useState(false);
  const [endTime, setEndTime] = React.useState("");
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnakOpen(false);
  };
  function timeChangeHandler(newValue: any) {
    setStartTimeSelected(newValue!.format("hh:mm A"));
  }
  function timeEndHanler(newValue: any) {
    setEndTime(newValue!.format("hh:mm A"));
  }
  const handleSelectionChange = (newSelection: row) => {
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

  async function handleSubmitContest() {
    const contestData = {
      start_time: startTime,
      date: date,
      questions: selectedRows,
      end_time: endTime,
    };
    setIsLoading(true);
    const res = await fetch("http://127.0.0.1:8000/api/contest/add/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxOTAzMzQ4MzgxLCJpYXQiOjE3MzA1NDgzODEsImp0aSI6IjY1M2FmNDlhZjcwNzRmYTQ4NGNiMzVmZGI4MTMxMjUzIiwidXNlcl9pZCI6MX0.c8dOQ102J73JaTc1KEYkOsIbuh3nWhBFPRwBo_i5Qlg",
      },
      body: JSON.stringify(contestData),
    });
    setaddStatus(res.status);
    setSnakOpen(true);
    setIsLoading(false);
  }

  return (
    <Box sx={{ p: 2 }}>
      <SnackBar
        snakOpen={snakOpen}
        handleClose={handleClose}
        addStatus={addStatus}
      />
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
      <Grid
        container
        alignItems={"center"}
        justifyContent={"space-between"}
        sx={{ mb: 3 }}
      >
        <Grid item xs={12} md={3}>
          <Typography
            sx={{
              color: "rgb(99, 115, 129)",
              fontFamily: "'Public Sans',sans-serif",
              fontSize: 14,
            }}
          >
            Date
          </Typography>
          <DatePickerDemo date={date!} setDate={setDate} />
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography
            sx={{
              color: "rgb(99, 115, 129)",
              fontFamily: "'Public Sans',sans-serif",
              fontSize: 14,
            }}
          >
            Start Time
          </Typography>
          <TimePickerComponent timeChangeHandler={timeChangeHandler} />
        </Grid>
        <Grid xs={12} md={3}>
          <Typography
            sx={{
              color: "rgb(99, 115, 129)",
              fontFamily: "'Public Sans',sans-serif",
              fontSize: 14,
            }}
          >
            End Time
          </Typography>
          <TimePickerComponent timeChangeHandler={timeEndHanler} />
        </Grid>
      </Grid>

      <Box>
        <LoadingButton
          loading={isLoading}
          loadingIndicator="Submiting..."
          variant="contained"
          sx={{ bgcolor: "#00AB55", textTransform: "none", fontWeight: 600 }}
          onClick={handleSubmitContest}
        >
          Add Contest
        </LoadingButton>
      </Box>
    </Box>
  );
}
