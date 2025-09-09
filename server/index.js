const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')
require('dotenv').config()

const app = express()
const port = 8000

mongoose.connect(process.env.DATABASE);

app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = [
      'https://music-app-bt4z.vercel.app',
      'http://localhost:3000'
    ];
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET", "POST", "PATCH", "DELETE", "PUT", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Cookie",
    "X-Requested-With",
    "Accept"
  ],
  credentials: true
}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

const adminRoute = require("./routes/admin/index.route");
app.use("/admin", adminRoute);

const clientRoute = require("./routes/client/index.route");
app.use("/", clientRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
