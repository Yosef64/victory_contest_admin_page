import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import React, { ReactNode } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useNavigate } from "react-router-dom";

import { Question } from "../../types/models";
import { deleteQusetion } from "@/lib/utils";
import { Loading } from "../common/Stauts";
const header = ["Question", "Chapter", "Grade", "Subject"];

export default function QuestionTable(props: any) {
  const { questions, status }: { questions: Question[]; status: string } =
    props;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  console.log(questions);

  const handleChangePage = (_event: any, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (status === "pending") {
    <Loading />;
  }

  return (
    <Box>
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
              .map((row: any, index: any) => (
                <Row key={index} row={row} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[2, 10, 25, 100]}
        component="div"
        count={questions?.length ?? 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          ".MuiTablePagination-selectLabel": {
            fontFamily: "'Public Sans',sans-serif",
            fontSize: "0.875rem",
            fontWeight: 600,
          },
          overflow: "hidden",
          fontFamily: "'Public Sans',sans-serif",
          // "&.MuiList-root": {
          //   margin: 10,
          //   backgroundColor: "black !important",
          // },
        }}
      />
    </Box>
  );
}

function Row(props: any) {
  const { row }: { row: Question } = props;
  const [open, setOpen] = React.useState(false);
  const [snakOpen, setSnakOpen] = React.useState(false);
  const navigate = useNavigate();
  const handleNavigate = (row: any) => {
    const jsonString = encodeURIComponent(JSON.stringify(row));
    navigate(`/dashboard/addquestion?edit=true&question=${jsonString}`);
  };

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
          {row.subject}
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
                  <div>
                    <Button
                      onClick={() => handleNavigate(row)}
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
                    <AlertForDelete
                      open={snakOpen}
                      setOpen={setSnakOpen}
                      question_id={row.id}
                    >
                      <button className="text-red-600 px-4 py-2 hover:bg-gray-200 rounded-lg font-sans font-semibold">
                        Delete
                      </button>
                    </AlertForDelete>
                  </div>
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
                {row.multiple_choice.map((choice: string, index) => {
                  return (
                    <Box
                      key={index}
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
                  : {row.explanation}
                </Box>
              </CardActions>
            </Card>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
function AlertForDelete({
  children,
  open,
  setOpen,
  question_id,
}: {
  children: ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  question_id: string | undefined;
}) {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const handleDeleteQuestion = async () => {
    setLoading(true);
    try {
      await deleteQusetion(question_id!);
      setOpen(false);
      setError(false);
      window.location.reload();
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            question you choose.
          </AlertDialogDescription>
          {error && (
            <div className="px-3 py-2">
              <span>Something went wrong!</span>
            </div>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <button
            className="hover:bg-red-400 bg-red-500 px-5 rounded-lg text-white font-bold"
            onClick={() => handleDeleteQuestion()}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
