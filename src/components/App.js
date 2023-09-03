import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((questions) => setQuestions(questions));
  }, []);

function handleNewQuestion(newQuestion) {
  setQuestions([...questions, newQuestion]);
}

function handleDeleteQuestion(deletedQuestion) {
  const updateQuestions = questions.filter((question) => question.id !== deletedQuestion.id);
  setQuestions(updateQuestions);
}

function handleUpdateQuestion(updatedQuestion) {
  const updatedQuestions = questions.map((question) => {
    if (question.id === updatedQuestion.id) {
      return updatedQuestion
    } else {
      return question
    }
  });
  setQuestions(updatedQuestions);
}

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onNewQuestion={handleNewQuestion} /> : <QuestionList questions={questions} onDeleteQuestion={handleDeleteQuestion} onUpdateQuestion={handleUpdateQuestion}/>}
    </main>
  );
}

export default App;
