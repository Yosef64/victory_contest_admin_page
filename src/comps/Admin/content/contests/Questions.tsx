import CustomizedDataGrid from "../home/CustomizedDataGrid";
import { GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { getQuestions } from "@/lib/utils";
import { CircularProgress } from "@mui/material";
import { Question } from "../models";

export const columns: GridColDef[] = [
  {
    field: "question_text",
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
interface Props {
  handleSelectionChange: (value: any) => void;
}
export default function Questions({ handleSelectionChange }: Props) {
  const {
    data: questions = [],
    status,
    error,
  } = useQuery({
    queryKey: ["questions"],
    queryFn: async () => {
      const data = await getQuestions();
      console.log("Fetched Questions:", data); // Debugging output
      return data;
    },
  });

  if (status === "pending") {
    return <CircularProgress />;
  }
  if (error) {
    return <div className="">Error</div>;
  }

  const rows: GridRowsProp = questions.map((q: Question) => ({
    id: q.id,
    question_text: q.question_text,
    subject: q.subject,
    chapter: q.chapter,
    grade: parseInt(q.grade, 10),
    explanation: q.explanation,
    multiple_choice: q.multiple_choice,
  }));

  return (
    <CustomizedDataGrid
      value={{ rows, columns }}
      onSelectionChange={handleSelectionChange}
    />
  );
}
