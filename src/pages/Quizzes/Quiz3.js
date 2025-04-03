import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import './Quiz.css';  

// Defining the quiz questions, options, and correct answers
const quiz = [
  {
    question: "What is the result of 3 + 2 * 2?",  // Question
    options: ["10", "7", "8", "9"],  // Answer options
    answer: "7"  // Correct answer
  },
  {
    question: "Which operator is used for exponentiation?",
    options: ["^", "**", "//", "%%"],
    answer: "**"
  },
  {
    question: "What is 10 % 3?",
    options: ["1", "3", "0", "2"],
    answer: "1"
  },
  {
    question: "What is the output of 3 // 2?",
    options: ["1.5", "1", "2", "0"],
    answer: "1"
  },
  {
    question: "Which of these is NOT a math operator?",
    options: ["+", "-", "*", "&"],
    answer: "&"
  }
];

// Quiz component
const Quiz3 = () => {
  const navigate = useNavigate(); // navigate function to move between pages
  const [currentQuestion, setCurrentQuestion] = useState(0); // State to track the current question
  const [answers, setAnswers] = useState({}); // State to store user answers
  const [score, setScore] = useState(null); // State to store the score after quiz submission
  const [feedback, setFeedback] = useState(""); // State to provide feedback on answers

  // Function to handle answer change
  const handleAnswerChange = (selectedOption) => {
    setAnswers((prev) => ({
      ...prev, // Spread the previous answers
      [currentQuestion]: selectedOption // Update the answer for the current question
    }));

    const current = quiz[currentQuestion]; // Get the current question
    // Provide feedback based on whether the answer is correct or not
    if (selectedOption === current.answer) {
      setFeedback("✅ Correct!"); // Correct answer
    } else {
      setFeedback(`❌ Incorrect. Correct answer is: ${current.answer}`); // Incorrect answer
    }
  };

  // Function to move to the next question
  const nextQuestion = () => {
    setCurrentQuestion((prev) => prev + 1); // Increment question index
    setFeedback(""); // Clear feedback for next question
  };

  // Function to calculate the score after quiz completion
  const checkScore = () => {
    const newScore = quiz.reduce((acc, q, index) => {
      return answers[index] === q.answer ? acc + 1 : acc; // Increment score for each correct answer
    }, 0);
    setScore(newScore); // Set the final score
  };

  return (
    <div className="quiz-container"> {/* Main container for quiz */}
      <h1 className="quiz-title">📘 Lesson 3 Quiz</h1> {/* Quiz title */}

      {/* Check if score is null (meaning quiz is still ongoing) */}
      {score === null ? (
        <div className="question">
          <p>{currentQuestion + 1}. {quiz[currentQuestion].question}</p> {/* Display current question */}
          {quiz[currentQuestion].options.map((option, i) => ( // Map through the options
            <div key={i} className="answer-option">
              <input
                type="radio"
                id={`q${currentQuestion}-${i}`}
                name={`q${currentQuestion}`}
                value={option}
                onChange={() => handleAnswerChange(option)} // Handle answer selection
                checked={answers[currentQuestion] === option} // Check if the option is selected
              />
              <label htmlFor={`q${currentQuestion}-${i}`}>{option}</label> {/* Label for the option */}
            </div>
          ))}

          {/* Display feedback after answer selection */}
          {feedback && <p className="feedback">{feedback}</p>}

          <div className="quiz-buttons">
            {/* Button to go back to the previous question if it's not the first question */}
            {currentQuestion > 0 && (
              <button onClick={() => setCurrentQuestion(currentQuestion - 1)}>Previous</button>
            )}
            {/* Button to go to the next question or submit the quiz if it's the last question */}
            {currentQuestion < quiz.length - 1 ? (
              <button onClick={nextQuestion}>Next</button>
            ) : (
              <button onClick={checkScore}>Submit Quiz</button>
            )}
          </div>
        </div>
      ) : (
        // If the quiz is completed, display the score and a button to proceed
        <div className="score">
          <p>Your score: {score} out of {quiz.length}</p> {/* Display score */}
          <button onClick={() => navigate("/game/3")}>
            Congrats on completing the quiz, Click here to enjoy your game!
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz3;
