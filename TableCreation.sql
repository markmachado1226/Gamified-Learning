


CREATE TABLE Users (
    user_id INT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(10) CHECK (role IN ('Student', 'Parent', 'Admin')),
    dob DATE
);



CREATE TABLE Students (
    user_id INT PRIMARY KEY,
    level_id INT NOT NULL,
    parent_id INT NULL,
    total_xp INT DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (level_id) REFERENCES Levels(level_id),
    FOREIGN KEY (parent_id) REFERENCES Users(user_id)
);



CREATE TABLE Parents (
    user_id INT PRIMARY KEY,
    phone_number VARCHAR(15),
    address VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);


CREATE TABLE Admins (
    user_id INT PRIMARY KEY,
    permissions VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);


CREATE TABLE Levels (
    level_id INT IDENTITY(1,1) PRIMARY KEY,
    level_number INT UNIQUE NOT NULL,
    description TEXT
);


CREATE TABLE Lessons (
    lesson_id INT IDENTITY(1,1) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    video_url VARCHAR(255) NULL,
    level_id INT NOT NULL,
    FOREIGN KEY (level_id) REFERENCES Levels(level_id)
);


CREATE TABLE Quizzes (
    quiz_id INT IDENTITY(1,1) PRIMARY KEY,
    lesson_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    FOREIGN KEY (lesson_id) REFERENCES Lessons(lesson_id)
);


CREATE TABLE Quiz_Questions (
    question_id INT IDENTITY(1,1) PRIMARY KEY,
    quiz_id INT NOT NULL,
    question_text TEXT NOT NULL,
    option_a VARCHAR(255) NOT NULL,
    option_b VARCHAR(255) NOT NULL,
    option_c VARCHAR(255) NOT NULL,
    option_d VARCHAR(255) NOT NULL,
    correct_answer VARCHAR(255) NOT NULL,
    FOREIGN KEY (quiz_id) REFERENCES Quizzes(quiz_id)
);


CREATE TABLE Student_Quiz_Attempt (
    attempt_id INT IDENTITY(1,1) PRIMARY KEY,
    student_id INT NOT NULL,
    quiz_id INT NOT NULL,
    score FLOAT NOT NULL,
    attempt_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES Students(user_id),
    FOREIGN KEY (quiz_id) REFERENCES Quizzes(quiz_id)
);


CREATE TABLE Code_Submissions (
    submission_id INT IDENTITY(1,1) PRIMARY KEY,
    student_id INT NOT NULL,
    lesson_id INT NOT NULL,
    code_snippet TEXT NOT NULL,
    output TEXT,
    submission_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES Students(user_id),
    FOREIGN KEY (lesson_id) REFERENCES Lessons(lesson_id)
);


CREATE TABLE Leaderboards (
    leaderboard_id INT IDENTITY(1,1) PRIMARY KEY,
    student_id INT NOT NULL UNIQUE,
    rank INT NOT NULL,
    xp_points INT DEFAULT 0,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES Students(user_id)
);


CREATE TABLE Rewards (
    reward_id INT IDENTITY(1,1) PRIMARY KEY,
    reward_name VARCHAR(255) NOT NULL,
    description TEXT,
    xp_required INT NOT NULL
);


CREATE TABLE Student_Rewards (
    student_id INT NOT NULL,
    reward_id INT NOT NULL,
    date_earned DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (student_id, reward_id),
    FOREIGN KEY (student_id) REFERENCES Students(user_id),
    FOREIGN KEY (reward_id) REFERENCES Rewards(reward_id)
);


CREATE TABLE Notifications (
    notification_id INT IDENTITY(1,1) PRIMARY KEY,
    parent_id INT NOT NULL,
    student_id INT NOT NULL,
    message TEXT NOT NULL,
    sent_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_id) REFERENCES Parents(user_id),
    FOREIGN KEY (student_id) REFERENCES Students(user_id)
);


CREATE TABLE Student_Progress (
    progress_id INT IDENTITY(1,1) PRIMARY KEY,
    student_id INT NOT NULL,
    lesson_id INT NOT NULL,
    status VARCHAR(15) CHECK (status IN ('not started', 'in progress', 'completed')),
    completed_at DATETIME NULL,
    FOREIGN KEY (student_id) REFERENCES Students(user_id),
    FOREIGN KEY (lesson_id) REFERENCES Lessons(lesson_id)
);
