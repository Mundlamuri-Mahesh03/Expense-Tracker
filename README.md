# 💰 Expense Tracker

A full-stack Expense Tracker application that helps users manage their income and expenses efficiently. Users can register, log in, track transactions, and download expense reports in Excel format.

---

## 🚀 Features

- User Authentication (Login & Signup)
- Add Income
- Add Expense
- View Transaction History
- Sort by Date (Latest First)
- Download Expense Report in Excel
- Secure API with JWT Authentication
- Auto logout on token expiry

---

## 🛠️ Tech Stack

### Frontend

- React
- React Router
- Axios
- React Hot Toast

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- XLSX (Excel export)

---

## 📂 Project Structure

### Backend

```
server/
 ├── controllers/
 ├── models/
 ├── routes/
 ├── middleware/
 └── server.js
```

### Frontend

```
client/
 ├── pages/
 ├── components/
 ├── context/
 ├── utils/
 └── App.js
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone <your-repo-url>
```

---

### 2️⃣ Backend Setup

```bash
cd server
npm install
```

Create `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run backend:

```bash
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd client
npm install
npm start
```

---

## 🔐 Authentication

- JWT token is stored in localStorage
- Axios interceptor attaches token to every request
- If token expires (401 response), user is automatically redirected to login

---

## 📊 Excel Export

Users can download expense data in Excel format.
Data includes:

- Category
- Amount
- Date

---

## 📌 Future Improvements

- Dashboard analytics (charts & graphs)
- Monthly budget tracking
- Dark/Light theme
- Category management
- Cloud deployment
- Refresh token implementation

---

## 🧑‍💻 Author

Your Name

---

## 📄 License

This project is licensed under the MIT License.
