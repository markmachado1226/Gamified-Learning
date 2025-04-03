import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // To navigate to another route after quiz completion
import './Quiz.css'; 

// Quiz data array with question, options, and correct answer
const quiz = [
  {
    question: "How do you assign a value to a variable?",
    options: ["x == 5", "x := 5", "x = 5", "5 = x"],
    answer: "x = 5"
  },
  {
    question: "What type is x in: x = '5'?",
    options: ["Integer", "Boolean", "String", "Float"],
    answer: "String"
  },
  {
    question: "Which is a valid variable name?",
    options: ["2var", "_var", "my-var", "var!"],
    answer: "_var"
  },
  {
    question: "Which keyword is NOT used for variables?",
    options: ["int", "float", "let", "str"],
    answer: "let"
  },
  {
    question: "What symbol is used for assignment?",
    options: ["=", "==", ":=", "<-"],
    answer: "="
  }
];

const Quiz2 = () => {
  const navigate = useNavigate(); // Initialize the navigation hook for page redirection
  const [currentQuestion, setCurrentQuestion] = useState(0); // Tracks the current question index
  const [answers, setAnswers] = useState({}); // Stores the user's selected answers
  const [score, setScore] = useState(null); // Holds the score after the quiz is completed
  const [feedback, setFeedback] = useState(""); // Stores feedback on the selected answer

  // Function to handle the user's answer selection
  const handleAnswerChange = (selectedOption) => {
    // Update the answers state with the selected answer for the current question
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: selectedOption
    }));

    // Get the current question to check if the answer is correct
    const current = quiz[currentQuestion];
    if (selectedOption === current.answer) {
      setFeedback("✅ Correct!"); // Feedback if the answer is correct
    } else {
      setFeedback(`❌ Incorrect. Correct answer is: ${current.answer}`); // Feedback if the answer is incorrect
    }
  };

  // Function to go to the next question
  const nextQuestion = () => {
    setCurrentQuestion((prev) => prev + 1); // Increment current question index
    setFeedback(""); // Reset feedback when moving to the next question
  };

  // Function to calculate the score after the quiz is submitted
  const checkScore = () => {
    const newScore = quiz.reduce((acc, q, index) => {
      // Compare the selected answer with the correct answer and count correct answers
      return answers[index] === q.answer ? acc + 1 : acc;
    }, 0);
    setScore(newScore); // Update score state with the calculated score
  };

  return (
    <div className="quiz-container">
      <h1 className="quiz-title">📘 Lesson 2 Quiz</h1>

      {score === null ? ( // If quiz is not yet submitted, show the questions
        <div className="question">
          <p>{currentQuestion + 1}. {quiz[currentQuestion].question}</p> {/* Display current question */}
          {quiz[currentQuestion].options.map((option, i) => (
            <div key={i} className="answer-option">
              <input
                type="radio"
                id={`q${currentQuestion}-${i}`} // Unique ID for each radio input
                name={`q${currentQuestion}`} // Group radio buttons by question
                value={option}
                onChange={() => handleAnswerChange(option)} // Handle answer selection
                checked={answers[currentQuestion] === option} // Mark option as selected
              />
              <label htmlFor={`q${currentQuestion}-${i}`}>{option}</label> {/* Display option */}
            </div>
          ))}

          {/* Display feedback for the selected answer */}
          {feedback && <p className="feedback">{feedback}</p>}

          <div className="quiz-buttons">
            {/* Show "Previous" button if not on the first question */}
            {currentQuestion > 0 && (
              <button onClick={() => setCurrentQuestion(currentQuestion - 1)}>Previous</button>
            )}
            {/* Show "Next" button if not on the last question, otherwise show "Submit Quiz" */}
            {currentQuestion < quiz.length - 1 ? (
              <button onClick={nextQuestion}>Next</button>
            ) : (
              <button onClick={checkScore}>Submit Quiz</button>
            )}
          </div>
        </div>
      ) : (
        // If quiz is completed, display the score
        <div className="score">
          <p>Your score: {score} out of {quiz.length}</p>
          <button onClick={() => navigate("/game/2")}>
            Congrats on completing the quiz, Click here to enjoy your game!
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz2;
