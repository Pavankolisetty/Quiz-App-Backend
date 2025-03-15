# Quiz Application Backend

## 📌 Project Overview
This is the backend for a Quiz Application built using **Node.js**, **Express.js**, and **MongoDB**. The backend provides APIs for user authentication, quiz management, and leaderboards.

## 🚀 Features
- **User Authentication:** Signup and Login functionality with JWT authentication.
- **Quiz Management:** CRUD operations for quizzes and questions.
- **User Quiz Participation:** Users can attempt quizzes and their scores are recorded.
- **Admin Dashboard Features:** Admins can manage quizzes and view leaderboard statistics.
- **Security:** Proper access control using JWT.

---

## 🛠 Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ORM)
- **Authentication:** JWT (JSON Web Tokens)

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/Pavankolisetty/Quiz-App-Backend.git
cd Quiz-App-Backend
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Set Up Environment Variables
Create a **.env** file in the root directory and add the following:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 4️⃣ Start the Server
```sh
npm start
```
By default, the server will run on **http://localhost:5000**.

---

## 🔥 API Endpoints & Testing via Postman

### 1️⃣ **User Authentication**
#### ➤ Signup
- **Endpoint:** `POST /api/auth/signup`
- **Request Body:**
```json
{
  "username": "testUser",
  "password": "test123"
}
```
- **Response:**
```json
{
  "message": "User registered successfully"
}
```

#### ➤ Login
- **Endpoint:** `POST /api/auth/login`
- **Request Body:**
```json
{
  "username": "testUser",
  "password": "test123"
}
```
- **Response:**
```json
{
  "message": "Login successful",
  "token": "your_jwt_token"
}
```

---

### 2️⃣ **Quiz Management**
#### ➤ Create a Quiz (Admin Only)
- **Endpoint:** `POST /api/quizzes`
- **Headers:**
```json
{
  "Authorization": "Bearer your_jwt_token"
}
```
- **Request Body:**
```json
{
  "title": "JavaScript Basics",
  "questions": [
    {
      "question": "What is the keyword for defining variables?",
      "options": ["var", "let", "const", "all of the above"],
      "answer": "all of the above"
    }
  ]
}
```

#### ➤ Get All Quizzes
- **Endpoint:** `GET /api/quizzes`
- **Response:** Returns a list of all available quizzes.

---

### 3️⃣ **Taking a Quiz**
#### ➤ Submit Quiz Attempt
- **Endpoint:** `POST /api/attempts`
- **Request Body:**
```json
{
  "quizId": "quiz_id_here",
  "answers": [
    { "questionId": "question_id_here", "selectedOption": "var" }
  ]
}
```
- **Response:**
```json
{
  "score": 5,
  "message": "Quiz submitted successfully"
}
```

---

## 🌐 Deployment (Vercel)

### 1️⃣ Push Code to GitHub
```sh
git add .
git commit -m "Initial commit"
git push origin main
```

### 2️⃣ Deploy on Vercel
- Sign up at [Vercel](https://vercel.com/)
- Connect your GitHub repository
- Deploy the backend

### 3️⃣ Set Environment Variables on Vercel
Go to **Vercel Dashboard → Project → Settings → Environment Variables**, then add:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 4️⃣ Get Deployment URL
Once deployed, you will receive a URL like `https://quiz-app-backend.vercel.app`. Update your frontend accordingly.

---

## 📝 Submission Instructions
1. **GitHub Repository:** Ensure the repository is private and add collaborators:
   - `abhay_gond@vecros.com`
   - `prime@vecros.com`
2. **Deployment URL:** Share your Vercel deployment URL in the repository README.
3. **Documentation:** Include clear API usage instructions and Postman collection if needed.

---

## 🎯 Future Enhancements
- **Add Role-Based Access Control** (RBAC) for admin & users
- **Implement Quiz Timer Feature**
- **Improve Security Measures**

---

## 📞 Contact
For any issues or suggestions, feel free to reach out!

---

🔥 **Happy Coding! 🚀**

