type Question = {
  id: number;
  question: string;
  choices: string[];
  explanation: string;
};
function parseQuestionsWithChoices(text: string) {
  const questions: Question[] = [];
  const lines = text.split("\n");

  let currentQuestion: Question | null = null;
  let currentChange = { question: false, choice: false, exp: false };

  lines.forEach((line) => {
    const questionMatch = line.match(/^Q\d*\.?\s*(.*)/i);
    const choiceMatch = line.match(/^([A-D])\.\s*(.*)/);
    const expMatch = line.startsWith("Explanation");
    if (questionMatch) {
      if (currentQuestion) {
        questions.push(currentQuestion);
      }

      currentQuestion = {
        id: questions.length + 1,
        question: questionMatch[1].trim(),
        choices: [],
        explanation: "",
      };
      currentChange.question = true;
    } else if (choiceMatch && currentQuestion) {
      currentQuestion.choices.push(choiceMatch[2].trim());
      currentChange = { question: false, choice: true, exp: false };
    } else if (expMatch) {
      // currentQuestion!.explanation += line.trim();
      currentChange = { question: false, choice: false, exp: true };
      const currentLine = line.trim();
      const explanation = currentLine.split(" ").slice(1).join(" ");
      currentQuestion!.explanation += explanation;
    } else {
      if (currentQuestion) {
        if (currentChange.question) {
          currentQuestion.question += line.trim();
        } else if (currentChange.choice) {
          currentQuestion.choices[currentQuestion.choices.length - 1] +=
            line.trim();
        } else if (currentChange.exp) {
          currentQuestion.explanation += line.trim();
        }
      }
    }
  });

  if (currentQuestion) {
    questions.push(currentQuestion);
  }

  return questions;
}
export function ProcessFile(file: File):Promise<Question[]> {
  if (!file) {
    console.error("Invalid file input.");
    return Promise.reject("Invalid file input.");
  }

  return new Promise((resolve, reject) => {
    

    const reader = new FileReader();
    reader.onload = (event: any) => {
      try {
        const text = event.target.result;
        const questions = parseQuestionsWithChoices(text);
        // console.log(questions);
        resolve(questions);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = (error) => {
      console.error("Error reading file:", error);
      reject(error);
    };

    reader.readAsText(file);
  });
}
