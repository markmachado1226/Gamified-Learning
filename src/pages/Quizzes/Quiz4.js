import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Quiz.css';  

const quiz = [
  // Array containing quiz questions and their options/answers
  {
    question: "Which keyword starts a conditional block?",  // Question text
    options: ["for", "if", "while", "switch"], // Available options for the question
    answer: "if"  // Correct answer
  },
  {
    question: "What does '==' check?",
    options: ["Assignment", "Equality", "Inequality", "Greater than"],
    answer: "Equality"
  },
  {
    question: "How do you write else-if in Python?",
    options: ["elseif", "else if", "elif", "ifelse"],
    answer: "elif"
  },
  {
    question: "What will if True: print('Hi') do?",
    options: ["Print Hi", "Do nothing", "Syntax Error", "Print True"],
    answer: "Print Hi"
  },
  {
    question: "Which symbol represents NOT in Python?",
    options: ["!", "~", "not", "^"],
    answer: "not"
  }
];

const Quiz4 = () => {
  const navigate = useNavigate(); // Hook to navigate between routes
  const [currentQuestion, setCurrentQuestion] = useState(0); // Track the current question index
  const [answers, setAnswers] = useState({}); // Store selected answers
  const [score, setScore] = useState(null); // Track score after quiz completion
  const [feedback, setFeedback] = useState(""); // Store feedback (correct or incorrect)

  // Handles answer selection and provides feedback
  const handleAnswerChange = (selectedOption) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: selectedOption // Update the answer for the current question
    }));

    const current = quiz[currentQuestion]; // Get the current question data
    if (selectedOption === current.answer) {
      setFeedback("✅ Correct!"); // Correct answer feedback
    } else {
      setFeedback(`❌ Incorrect. Correct answer is: ${current.answer}`); // Incorrect answer feedback
    }
  };

  // Move to the next question
  const nextQuestion = () => {
    setCurrentQuestion((prev) => prev + 1); // Increment current question index
    setFeedback(""); // Reset feedback for the next question
  };

  // Calculate the user's score
  const checkScore = () => {
    const newScore = quiz.reduce((acc, q, index) => {
      return answers[index] === q.answer ? acc + 1 : acc; // Count correct answers
    }, 0);
    setScore(newScore); // Set final score
  };

  return (
    <div className="quiz-container">
      <h1 className="quiz-title">📘 Lesson 4 Quiz</h1>

      {score === null ? ( // If the quiz is not yet finished
        <div className="question">
          <p>{currentQuestion + 1}. {quiz[currentQuestion].question}</p> {/* Display current question */}
          {quiz[currentQuestion].options.map((option, i) => (
            // Display options for the current question
            <div key={i} className="answer-option">
              <input
                type="radio"
                id={`q${currentQuestion}-${i}`} // Unique ID for each option
                name={`q${currentQuestion}`} // Group options for the current question
                value={option}
                onChange={() => handleAnswerChange(option)} // Handle answer change
                checked={answers[currentQuestion] === option} // Mark the selected option as checked
              />
              <label htmlFor={`q${currentQuestion}-${i}`}>{option}</label> {/* Display option */}
            </div>
          ))}

          {feedback && <p className="feedback">{feedback}</p>} {/* Display feedback */}

          <div className="quiz-buttons">
            {currentQuestion > 0 && (
              <button onClick={() => setCurrentQuestion(currentQuestion - 1)}>Previous</button> // Go to previous question
            )}
            {currentQuestion < quiz.length - 1 ? (
              <button onClick={nextQuestion}>Next</button> // Go to next question
            ) : (
              <button onClick={checkScore}>Submit Quiz</button> // Submit the quiz
            )}
          </div>
        </div>
      ) : (
        // Display score after quiz completion
        <div className="score">
          <p>Your score: {score} out of {quiz.length}</p> {/* Display the final score */}
          <button onClick={() => navigate("/game/4")}>
            Congrats on completing the quiz, Click here to enjoy your game!
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz4;
