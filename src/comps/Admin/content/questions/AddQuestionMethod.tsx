import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Grid,
  SnackbarCloseReason,
  Typography,
} from "@mui/material";
import { useState } from "react";
import SnackBar from "./Snackbar";
import cloud from "../../../../assets/cloud.svg";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { chapters, grades, Subjects } from "./Data";
import LoadingButton from "@mui/lab/LoadingButton";
import { ProcessFile } from "./processData";
import { addOneQuestion } from "@/lib/utils";
import { Question } from "../models";
import { useSearchParams } from "react-router-dom";

interface OptionProps {
  index: number;
  handleChangeOptions: (index: number, value: string) => void;
  value: string;
}

function Option({
  index,
  handleChangeOptions,
  value,
}: {
  index: number;
  handleChangeOptions: (index: number, value: string) => void;
  value: string;
}) {
  return (
    <input
      type="text"
      className="bg-gray-50 h-12 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#00AB55] focus:border-[#00AB55] block w-full p-2.5 focus:outline-none"
      placeholder={`Option ${index + 1}`}
      onChange={(e) => handleChangeOptions(index, e.target.value)}
      value={value}
      required
    />
  );
}

export function AddQuestionManual() {
  const [searchParams] = useSearchParams();

  const questionString = searchParams.get("question");
  const question: Question = questionString
    ? JSON.parse(questionString)
    : {
        question_text: "",
        choices: ["", ""],
        answer: "",
        grade: "",
        subject: "",
        chapter: "",
        explanation: "",
      };

  const [loading, setLoading] = useState(false);
  const [addStatus, setAddStatus] = useState(200);
  const [snakOpen, setSnakOpen] = useState(false);
  const [formData, setFormData] = useState({
    question_text: "",
    multiple_choice: ["", ""],
    answer: "",
    grade: "",
    subject: "",
    chapter: "",
    explanation: "",
  });

  const handleClose = (
    _event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    setSnakOpen(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
    console.log(formData);
    if (Object.values(formData).some((value) => !value)) {
      setSnakOpen(true);
      setAddStatus(500);
    }
    try {
      await addOneQuestion(formData);
    } catch (error) {
      setAddStatus(500);
      console.error(error);
    }
    setLoading(false);
    setSnakOpen(true);
  };

  const handleChangeOptions = (index: number, value: string) => {
    setFormData((prevData) => {
      const newOptions = [...prevData.multiple_choice];
      newOptions[index] = value;
      return { ...prevData, multiple_choice: newOptions };
    });
  };

  const handleAddOption = () => {
    setFormData((prevData) => ({
      ...prevData,
      multiple_choice: [...prevData.multiple_choice, ""],
    }));
  };

  return (
    <Box>
      <SnackBar
        snakOpen={snakOpen}
        handleClose={handleClose}
        addStatus={addStatus}
      />
      <textarea
        id="message"
        rows={4}
        className="block p-2.5 text-sm w-[50%] text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-[#00AB55] focus:border-[#00AB55] focus:outline-none"
        placeholder="Write the question..."
        onChange={(e) =>
          setFormData({ ...formData, question_text: e.target.value })
        }
      ></textarea>

      <Box>
        <Box sx={{ display: "flex", gap: 10, alignItems: "center" }}>
          <Typography sx={{ my: 3, fontWeight: 600, fontSize: 17 }}>
            Options
          </Typography>
          <Button
            variant="text"
            sx={{
              backgroundColor: "#00AB5514",
              color: "#00AB55",
              fontWeight: 600,
            }}
            onClick={handleAddOption}
          >
            Add Option
          </Button>
        </Box>

        <Grid container spacing={4}>
          {formData.multiple_choice.map((option, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Option
                index={index}
                handleChangeOptions={handleChangeOptions}
                value={option}
              />
            </Grid>
          ))}
        </Grid>

        <div>
          <p className="font-sans my-5 font-semibold text-lg">Value</p>
          <input
            type="text"
            id="answer"
            value={question.answer}
            className="bg-gray-50 h-12 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#00AB55] focus:border-[#00AB55] block w-[20%] p-2.5 focus:outline-none"
            placeholder="Answer"
            onChange={(e) =>
              setFormData({ ...formData, answer: e.target.value })
            }
            required
          />
          <textarea
            id="explanation"
            rows={4}
            className="block p-2.5 text-sm w-[50%] text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-[#00AB55] focus:border-[#00AB55] focus:outline-none"
            placeholder="Explanation..."
            onChange={(e) =>
              setFormData({ ...formData, explanation: e.target.value })
            }
          ></textarea>
        </div>

        <div className="flex flex-col">
          <div className="font-sans my-5 font-semibold text-lg">Info</div>
          <div className="flex gap-6">
            <Select
              onValueChange={(value) =>
                setFormData({ ...formData, grade: value })
              }
            >
              <SelectTrigger className="w-[180px] h-[50px]">
                <SelectValue placeholder="Select Grade" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Grade</SelectLabel>
                  {grades.map((grad) => (
                    <SelectItem key={grad} value={grad.split(" ")[1]}>
                      {grad}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select
              onValueChange={(value) =>
                setFormData({ ...formData, subject: value })
              }
            >
              <SelectTrigger className="w-[180px] h-[50px]">
                <SelectValue placeholder="Select Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Subject</SelectLabel>
                  {Subjects.map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select
              onValueChange={(value) =>
                setFormData({ ...formData, chapter: value })
              }
            >
              <SelectTrigger className="w-[180px] h-[50px]">
                <SelectValue placeholder="Select Chapter" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Chapter</SelectLabel>
                  {chapters.map((chapter) => (
                    <SelectItem key={chapter} value={chapter.split(" ")[1]}>
                      {chapter}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Box>

      <div className="mt-7">
        {!questionString ? (
          <LoadingButton
            loading={loading}
            onClick={handleSubmit}
            sx={{
              backgroundColor: "#00AB55",
              borderRadius: 2,
              width: 100,
              fontSize: 15,
              fontWeight: 600,
            }}
            variant="contained"
          >
            Add
          </LoadingButton>
        ) : (
          <LoadingButton>Edit</LoadingButton>
        )}
      </div>
    </Box>
  );
}

export function UploadQuestonsComponent() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const handleFileChange = async (e: any) => {
    const file = e.target.files[0];
    ProcessFile(file)
      .then((value: Question[]) => {
        setQuestions(value);
      })
      .catch((err) => console.log(err));
  };
  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 7 }}>
        <Typography
          sx={{ fontFamily: "'Public Sans',sans-serif", fontWeight: 600 }}
        >
          Upload :{" "}
        </Typography>
        <Box
          sx={{
            height: 90,
            border: "1px gray dashed",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 3,
            borderRadius: 3,
            cursor: "pointer",
          }}
          component={"label"}
        >
          <img src={cloud} alt="cloud" />
          <Typography
            sx={{
              fontFamily: "'Public Sans',sans-serif",
              fontSize: 13,
              color: "",
            }}
          >
            Click to upload the document
          </Typography>
          <input
            type="file"
            onChange={handleFileChange}
            accept=".doc,.docx,.pdf,.txt"
            style={{ display: "none" }}
          />
        </Box>
      </Box>
      <Box sx={{ mt: 8 }}>
        <Typography
          sx={{
            fontFamily: "'Public Sans',sans-serif",
            fontWeight: 600,
            mb: 4,
          }}
        >
          Proccessed Questions
        </Typography>
        <Box>
          {questions.map((question: Question, index: number) => (
            <Card
              key={index}
              elevation={0}
              sx={{
                my: 0.8,
                borderRadius: 3,
                boxShadow: "0 0 1px #9c9898",
              }}
            >
              <CardHeader
                title={"Q. " + question.question_text}
                action={
                  <Button
                    sx={{
                      fontFamily: "'Public Sans',sans-serif",
                      textTransform: "none",
                      backgroundColor: "#00AB5514",
                      color: "#00AB55",
                      fontWeight: 600,
                    }}
                  >
                    Edit
                  </Button>
                }
                sx={{
                  "& .MuiCardHeader-title": {
                    fontFamily: "'Public Sans',sans-serif",
                    fontWeight: 600,
                    lineHeight: 1.57143,
                    fontSize: 15,
                    textOverflow: "ellipsis",
                  },
                }}
              />
              <CardContent>
                {question.multiple_choice.map((choice: string, i: number) => (
                  <Box
                    key={i}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      padding: 0,
                    }}
                  >
                    <Checkbox
                      checked={question.answer === String.fromCharCode(65 + i)} // A=65, B=66, etc.
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
                ))}
              </CardContent>
              <CardActions
                sx={{
                  backgroundColor: "#00AB5514",
                  fontFamily: "'Public Sans',sans-serif",
                  fontSize: 14,
                }}
              >
                <Box>
                  <span style={{ color: "#00AB55", fontWeight: 600 }}>
                    Explanation
                  </span>
                  : {question.explanation}
                </Box>
              </CardActions>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
