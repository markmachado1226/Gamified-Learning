import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Quiz.css'; 

// Quiz questions array with question text, options, and correct answers
const quiz = [
  {
    question: "What function is used to print in Python?",
    options: ["echo()", "print()", "printf()", "display()"],
    answer: "print()"
  },
  {
    question: "What will print('Hello') output?",
    options: ["Hello", "print(Hello)", "Syntax Error", "Nothing"],
    answer: "Hello"
  },
  {
    question: "Which of these is a correct string?",
    options: ['"Python"', "Python", "'Python", "Python'"],
    answer: '"Python"'
  },
  {
    question: "Which keyword is used to display output?",
    options: ["input", "print", "show", "echo"],
    answer: "print"
  },
  {
    question: 'Which of these would NOT result in an error?',
    options: ['print("Hi")', 'print(Hi)', 'print("Hi)', 'prnt("Hi")'],
    answer: 'print("Hi")'
  }
];

const Quiz1 = () => {
  const navigate = useNavigate(); // Hook for navigation
  const [currentQuestion, setCurrentQuestion] = useState(0); // Tracks the current question index
  const [answers, setAnswers] = useState({}); // Stores selected answers
  const [score, setScore] = useState(null); // Stores the quiz score
  const [feedback, setFeedback] = useState(""); // Stores feedback for selected answers

  // Function to handle answer selection
  const handleAnswerChange = (selectedOption) => {
    // Update selected answers
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: selectedOption
    }));

    // Provide immediate feedback on correctness
    const current = quiz[currentQuestion];
    if (selectedOption === current.answer) {
      setFeedback("✅ Correct!");
    } else {
      setFeedback(`❌ Incorrect. Correct answer is: ${current.answer}`);
    }
  };

  // Function to move to the next question
  const nextQuestion = () => {
    setCurrentQuestion((prev) => prev + 1);
    setFeedback(""); // Reset feedback when moving to the next question
  };

  // Function to calculate and display the final score
  const checkScore = () => {
    const newScore = quiz.reduce((acc, q, index) => {
      return answers[index] === q.answer ? acc + 1 : acc;
    }, 0);
    setScore(newScore); // Update the score state
  };

  return (
    <div className="quiz-container">
      <h1 className="quiz-title">Python Quiz</h1>

      {score === null ? ( // If quiz is not yet submitted, display questions
        <div className="question">
          <p>{currentQuestion + 1}. {quiz[currentQuestion].question}</p>
          {quiz[currentQuestion].options.map((option, i) => (
            <div key={i} className="answer-option">
              <input
                type="radio"
                id={`q${currentQuestion}-${i}`}
                name={`q${currentQuestion}`}
                value={option}
                onChange={() => handleAnswerChange(option)}
                checked={answers[currentQuestion] === option} // Keeps track of selected answer
              />
              <label htmlFor={`q${currentQuestion}-${i}`}>{option}</label>
            </div>
          ))}

          {/* Display feedback for the selected answer */}
          {feedback && <p className="feedback">{feedback}</p>}

          {/* Navigation buttons */}
          <div className="quiz-buttons">
            {currentQuestion > 0 && ( // Show "Previous" button if not on first question
              <button onClick={() => setCurrentQuestion(currentQuestion - 1)}>Previous</button>
            )}
            {currentQuestion < quiz.length - 1 ? ( // Show "Next" button if not on last question
              <button onClick={nextQuestion}>Next</button>
            ) : (
              <button onClick={checkScore}>Submit Quiz</button> // Show "Submit Quiz" on last question
            )}
          </div>
        </div>
      ) : (
        // Display the score after quiz completion
        <div className="score">
          <p>Your score: {score} out of {quiz.length}</p>
          <button onClick={() => navigate("/game/1")}>
            Congrats on completing the quiz, Click here to enjoy your game!
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz1;
