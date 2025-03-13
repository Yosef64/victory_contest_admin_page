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
  TextField,
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
const access_token = import.meta.env.ACESS_TOKEN;

function Option({ index, handleChangeOptions, formData }: OptionProps) {
  return (
    <input
      type="text"
      className="bg-gray-50 h-12 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#00AB55] focus:border-[#00AB55] block w-full p-2.5 focus:outline-none"
      placeholder={`Option ${index + 1}`}
      onChange={(e) => handleChangeOptions(index, e.target.value)}
      value={formData.choices[0]}
      required
    />
  );
}

type OptionProps = {
  index: number;
  handleChangeOptions: (index: number, value: string) => void;
  formData: any;
};
export function AddQuestionManual({
  questionString,
}: {
  questionString: string | null;
}) {
  const question = questionString
    ? JSON.parse(questionString)
    : {
        question_text: "",
        choices: ["", ""],
        answer: "",
        grade: "",
        subject: "",
        chapter: "",
      };
  const [loading, setLoading] = useState(false);
  const [addStatus, setaddStatus] = useState(200);
  const [snakOpen, setSnakOpen] = useState(false);
  const [formData, setFormData] = useState(question);
  const [optionComponents, setOptionComponents] = useState([
    <Option
      index={0}
      handleChangeOptions={handleChangeOptions}
      formData={formData}
    />,
    <Option
      index={1}
      handleChangeOptions={handleChangeOptions}
      formData={formData}
    />,
  ]);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnakOpen(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await addOneQuestion(formData);
      setaddStatus(res.status);
    } catch (error) {
      setaddStatus(500);
      console.log(error);
    }
    setLoading(false);
    setSnakOpen(true);
  };
  function handleChangeOptions(index: number, value: string) {
    const newOptions = [...formData.choices];
    newOptions[index] = value;
    setFormData({ ...formData, choices: newOptions });
  }
  const handleAddOption = () => {
    const newOption = (
      <Option
        index={optionComponents.length}
        handleChangeOptions={handleChangeOptions}
        formData={formData}
      />
    );
    setOptionComponents([...optionComponents, newOption]);
    setFormData({ ...formData, choices: [...formData.choices, ""] });
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
        className="block p-2.5  text-sm w-[50%] text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-[#00AB55] focus:border-[#00AB55]  focus:outline-none"
        placeholder="write the question..."
        onChange={(e) =>
          setFormData({ ...formData, question_text: e.target.value })
        }
      ></textarea>

      <Box>
        <Box sx={{ display: "flex", gap: 10, alignItems: "center" }}>
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
          <Button
            variant="text"
            sx={{
              fontFamily: "'Public Sans',sans-serif",
              textTransform: "none",
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
          {optionComponents.map((component) => {
            return (
              <Grid item xs={12} sm={6}>
                {component}
              </Grid>
            );
          })}
        </Grid>
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
            <input
              type="text"
              id="company"
              className="bg-gray-50 h-12 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#00AB55] focus:border-[#00AB55] block w-full p-2.5 focus:outline-none"
              placeholder="Answer"
              onChange={(e) =>
                setFormData({ ...formData, answer: e.target.value })
              }
              required
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
            <Select
              onValueChange={(value) =>
                setFormData({ ...formData, grade: value })
              }
            >
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
                    Grade
                  </SelectLabel>
                  {grades.map((grad: string) => {
                    return (
                      <SelectItem value={grad.split(" ")[1]}>{grad}</SelectItem>
                    );
                  })}
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
            <Select
              onValueChange={(value) =>
                setFormData({ ...formData, subject: value })
              }
            >
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
                    Subject
                  </SelectLabel>
                  {Subjects.map((subject) => {
                    return <SelectItem value={subject}>{subject}</SelectItem>;
                  })}
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
            <Select
              onValueChange={(value) =>
                setFormData({ ...formData, chapter: value })
              }
            >
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
                    Chapter
                  </SelectLabel>
                  {chapters.map((chapter) => {
                    return (
                      <SelectItem value={chapter.split(" ")[1]}>
                        {chapter}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Box>
        </Box>
      </Box>
      <Box>
        {!questionString ? (
          <LoadingButton
            loading={loading}
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
          </LoadingButton>
        ) : (
          <LoadingButton>Edit</LoadingButton>
        )}
      </Box>
    </Box>
  );
}
type Question = {
  id: number;
  question: string;
  choices: string[];
  explanation: string;
};
export function UploadQuestonsComponent() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    const returned = ProcessFile(file);

    returned.then((value: Question[]) => {
      setQuestions(value);
    });
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
          {questions.map((question: Question) => {
            return (
              <Card
                elevation={0}
                sx={{
                  my: 0.8,
                  borderRadius: 3,
                  boxShadow: "0 0 1px #9c9898",
                  // height: 200,
                }}
              >
                <CardHeader
                  title={"Q. " + question.question}
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
                      fontFamily: "'Public Sans', sans-seri",
                      fontWeight: 600,
                      lineHeight: 1.57143,
                      fontSize: 15,
                      textOverflow: "ellipsis",
                    },
                  }}
                />
                <CardContent>
                  {question.choices.map((choice: string) => {
                    return (
                      <Box
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
                    fontSize: 14,
                  }}
                >
                  <Box>
                    <span
                      style={{
                        color: "#00AB55",
                        fontWeight: 600,
                      }}
                    >
                      Explanation
                    </span>{" "}
                    : {question.explanation}
                  </Box>
                </CardActions>
              </Card>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
