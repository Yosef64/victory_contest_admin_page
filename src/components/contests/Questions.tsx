import CustomizedDataGrid from "../home/CustomizedDataGrid";
import { GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { getQuestions } from "@/lib/utils";
import { Question } from "../../types/models";
import { useEffect, useState } from "react";
import { Loading } from "../common/Stauts";
import { Select, MenuItem, FormControl, InputLabel, TextField } from "@mui/material";

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
  const [status, setStatus] = useState("pending");
  const [questions, setQuestions] = useState<Question[]>([]);

  const [filters, setFilters] = useState({
    grade: '',
    subject: '',
    chapter: '',
    searchText: ''
  });

  useEffect(() => {
    const fetchQuestions = async () => {
      setStatus("pending");
      try {
        const data: Question[] = await getQuestions();
        setQuestions(data);
        setStatus("sucess");
      } catch (error) {
        setStatus("error");
      }
    };

    fetchQuestions();
  }, []);

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const filteredQuestions = questions.filter(question => {
    return (
      (filters.grade === '' || question.grade === filters.grade) &&
      (filters.subject === '' || question.subject === filters.subject) &&
      (filters.chapter === '' || question.chapter === filters.chapter) &&
      (filters.searchText === '' || 
        question.question_text.toLowerCase().includes(filters.searchText.toLowerCase()))
    );
  });
  if (status === "pending") {
    return <Loading />;
  }
  if (status === "error") {
    return <div className="">Error</div>;
  }

  const rows: GridRowsProp = filteredQuestions.map((q: Question) => ({
    id: q.id,
    question_text: q.question_text,
    subject: q.subject,
    chapter: q.chapter,
    grade: parseInt(q.grade, 10),
    explanation: q.explanation,
    multiple_choice: q.multiple_choice,
  }));

  return (
    <div>
      {/* Add filter controls */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
        <FormControl sx={{ width: 200 }}>
          <InputLabel>Grade</InputLabel>
          <Select
            value={filters.grade}
            onChange={(e) => handleFilterChange('grade', e.target.value)}
            label="Grade"
          >
            <MenuItem value="">All Grades</MenuItem>
            <MenuItem value="9">Grade 9</MenuItem>
            <MenuItem value="10">Grade 10</MenuItem>
            <MenuItem value="11">Grade 11</MenuItem>
            <MenuItem value="12">Grade 12</MenuItem>
          </Select>
        </FormControl>
        
        <FormControl sx={{ width: 200 }}>
          <InputLabel>Subject</InputLabel>
          <Select
            value={filters.subject}
            onChange={(e) => handleFilterChange('subject', e.target.value)}
            label="Subject"
          >
            <MenuItem value="">All Subjects</MenuItem>
            <MenuItem value="Math">Maths</MenuItem>
            <MenuItem value="Biology">Biology</MenuItem>
            <MenuItem value="Chemistry">Chemistry</MenuItem>
            <MenuItem value="Physics">Physics</MenuItem>
          </Select>
        </FormControl>
        
        <FormControl sx={{ width: 200 }}>
          <InputLabel>Chapter</InputLabel>
          <Select
            value={filters.chapter}
            onChange={(e) => handleFilterChange('chapter', e.target.value)}
            label="Chapter"
          >
            <MenuItem value="">All Chapters</MenuItem>
            <MenuItem value="1">Chapter 1</MenuItem>
            <MenuItem value="2">Chapter 2</MenuItem>
            <MenuItem value="3">Chapter 3</MenuItem>
            {/* Add more chapters as needed */}
          </Select>
        </FormControl>
        
        <TextField 
          label="Search Question"
          variant="outlined"
          value={filters.searchText}
          onChange={(e) => handleFilterChange('searchText', e.target.value)}
        />
      </div>
      
      <CustomizedDataGrid
        value={{ rows, columns }}
        onSelectionChange={handleSelectionChange}
      />
    </div>

  );
}
