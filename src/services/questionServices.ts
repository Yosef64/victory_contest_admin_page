import api from "./api";

export async function addQuestion(questionForm: FormData) {
  console.log("hello from questionServices", questionForm);
  const res = await api.post("/api/question/addquestion", questionForm);
  return res.data;
}
