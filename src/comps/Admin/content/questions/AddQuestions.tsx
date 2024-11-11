import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export default function AddQuestions() {
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [answer, setAnswer] = useState("");
  const [grade, setGrade] = useState("");
  const [subject, setSubject] = useState("");
  const [chapter, setChapter] = useState("");

  const handleOptionChange = (index: number, value: any) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };
  const handleSubmit = () => {
    const formData = {
      question_text: questionText,
      choices: options,
      answer: answer,
      grade: Number(grade),
      subject: Number(subject),
      chapter: Number(chapter),
    };
    console.log(formData);
  };
  return (
    <Box>
      <Box sx={{ mb: 5 }}>
        <Typography
          sx={{
            fontFamily: "'Public Sans',sans-serif",
            fontSize: 20,
            fontWeight: 700,
          }}
        >
          Add Question
        </Typography>
      </Box>
      <Box>
        <TextField
          onChange={(e) => setQuestionText(e.target.value)}
          label="Question"
          sx={{ width: "50%" }}
        />
        <Box>
          <Typography
            sx={{
              my: 3,
              fontFamily: "'Public Sans',sans-serif",
              fontWeight: 600,
              fontSize: 17,
            }}
          >
            Options
          </Typography>
          <Box
            sx={{
              display: "flex",
              width: "95%",
              gap: "10%",
              mb: 3,
            }}
          >
            <TextField
              onChange={(e) => handleOptionChange(0, e.target.value)}
              fullWidth
              label="Option 1"
            />
            <TextField
              onChange={(e) => handleOptionChange(1, e.target.value)}
              fullWidth
              label="Option 2"
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              width: "95%",
              gap: "10%",
            }}
          >
            <TextField
              onChange={(e) => handleOptionChange(2, e.target.value)}
              sx={{ height: "50px" }}
              fullWidth
              label="Option 3"
            />
            <TextField
              onChange={(e) => handleOptionChange(3, e.target.value)}
              fullWidth
              label="Option 4"
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              my: 3,
              width: "95%",
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontFamily: "'Public Sans',sans-serif",
                  mb: 1,
                  fontWeight: 600,
                }}
              >
                Answer
              </Typography>
              <TextField
                onChange={(e) => setAnswer(e.target.value)}
                label="Answer"
              />
            </Box>
            <Box>
              <Typography
                sx={{
                  fontFamily: "'Public Sans',sans-serif",
                  mb: 1,
                  fontWeight: 600,
                }}
              >
                Grade
              </Typography>
              <Select onValueChange={(value) => setGrade(value)}>
                <SelectTrigger
                  style={{ fontFamily: "'Public Sans',sans-serif" }}
                  className="w-[180px] h-[50px]"
                >
                  <SelectValue placeholder="Select Grade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel
                      style={{ fontFamily: "'Public Sans',sans-serif" }}
                    >
                      School
                    </SelectLabel>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Box>
            <Box>
              <Typography
                sx={{
                  fontFamily: "'Public Sans',sans-serif",
                  mb: 1,
                  fontWeight: 600,
                }}
              >
                Subject
              </Typography>
              <Select onValueChange={(value) => setSubject(value)}>
                <SelectTrigger
                  style={{ fontFamily: "'Public Sans',sans-serif" }}
                  className="w-[180px] h-[50px]"
                >
                  <SelectValue placeholder="Select Subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel
                      style={{ fontFamily: "'Public Sans',sans-serif" }}
                    >
                      School
                    </SelectLabel>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Box>
            <Box>
              <Typography
                sx={{
                  fontFamily: "'Public Sans',sans-serif",
                  mb: 1,
                  fontWeight: 600,
                }}
              >
                Chapter
              </Typography>
              <Select onValueChange={(value) => setChapter(value)}>
                <SelectTrigger
                  style={{ fontFamily: "'Public Sans',sans-serif" }}
                  className="w-[180px] h-[50px]"
                >
                  <SelectValue placeholder="Select chapter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel
                      style={{ fontFamily: "'Public Sans',sans-serif" }}
                    >
                      School
                    </SelectLabel>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Box>
          </Box>
        </Box>
        <Box>
          <Button
            onClick={handleSubmit}
            sx={{
              backgroundColor: "#00AB55",
              borderRadius: 2,
              width: 100,
              fontFamily: "'Public Sans',sans-serif",
              textTransform: "none",
              fontSize: 15,
              fontWeight: 600,
            }}
            variant="contained"
          >
            Add
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
