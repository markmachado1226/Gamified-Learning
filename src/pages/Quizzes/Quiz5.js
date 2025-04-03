import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Quiz.css';  

const quiz = [
    // Array containing quiz questions and their options/answers
    {
      question: "Which loop repeats a known number of times?",  // Question text
      options: ["while", "if", "for", "do-while"], // Available options for the question
      answer: "for"  // Correct answer
    },
    {
      question: "What does 'break' do in a loop?",
      options: ["Skips to next", "Ends the loop", "Continues loop", "Throws error"],
      answer: "Ends the loop"
    },
    {
      question: "What is the output of: for i in range(3): print(i)?", // Question with code
      code: "for i in range(3):\n    print(i)", // Python code snippet
      options: ["1 2 3", "0 1 2", "0 1 2 3", "1 2"], // Options for the output
      answer: "0 1 2"  // Correct answer
    },
    {
      question: "Which loop can be infinite?", // Question about infinite loop
      options: ["for", "while", "if", "do"],
      answer: "while"
    },
    {
      question: "What is used to skip an iteration?",  // Question about skipping iteration
      options: ["skip", "break", "continue", "next"],
      answer: "continue"
    }
  ];
  
  const Quiz5 = () => {
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
        <h1 className="quiz-title">📘 Lesson 5 Quiz: Loops</h1> {/* Title of the quiz */}
  
        {score === null ? ( // If the quiz is not yet finished
          <div className="question">
            <p>{currentQuestion + 1}. {quiz[currentQuestion].question}</p> {/* Display current question */}
            
            {quiz[currentQuestion].code && (
              <pre className="quiz-code">{quiz[currentQuestion].code}</pre> // Display code snippet if present
            )}
            
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
            <button onClick={() => navigate("/game/5")}>
              Congrats on completing the quiz, Click here to enjoy your game!
            </button>
          </div>
        )}
      </div>
    );
  };
  
  export default Quiz5;
  