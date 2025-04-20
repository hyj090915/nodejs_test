const express = require('express');
const path = require('path');
const cors = require('cors'); // 추가
const app = express();

app.use(cors()); // ← 여기에 CORS 허용 추가
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // 🔥 여기 추가

const users = [];

// 회원가입
app.post('/signup', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: 'Username and password required' });

  const exists = users.find(u => u.username === username);
  if (exists)
    return res.status(409).json({ message: 'Username already exists' });

  users.push({ username, password });
  res.status(201).json({ message: 'Signup successful!' });
});

// 로그인
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user)
    return res.status(401).json({ message: 'Invalid credentials' });

  res.status(200).json({ message: `Welcome, ${username}` });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
