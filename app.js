const express = require('express');
const path = require('path');  // 引入 path 模块
const cors = require('cors');
const admin = require('firebase-admin');

const app = express();
const port = 3001;


// Initialize Firebase Admin
// admin.initializeApp({
//   credential: admin.credential.applicationDefault(),
//   databaseURL: 'YOUR_FIREBASE_URL'
// });

// const db = admin.firestore();



// Enable CORS for all requests
app.use(cors());

// Serve static files from the "public" directory
app.use(express.static('public'));

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('incidents').get();
    const incidents = [];
    
    snapshot.forEach(doc => {
      incidents.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    res.render('map', { incidents: JSON.stringify(incidents) });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get('/map2', (req, res) => {
  res.render('map2', { user: { name: 'CPV_' } }); // Passing a sample user
});

app.get('/relate', (req, res) => {
  res.render('relate', { user: { name: 'CPV_' } }); // Passing a sample user
});

// profile 页面路由，使用 EJS 渲染
app.get('/profile', (req, res) => {
  // 模拟用户数据
  const user = {
    name: 'CDPV',
    age: 35,
    profession: 'Engineer',
    hobbies: ['Volumes', 'Cramping', 'Poops'],
    alerts:['Pay attention to your coming period. (7 days left)']
  };

  // 渲染 profile.ejs 页面
  res.render('profile', { user });
});

// Example API endpoint
app.get('/api/data', (req, res) => {
  res.json({ message: 'Hello from the external API!' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});











