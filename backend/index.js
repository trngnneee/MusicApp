const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config()

const app = express()
const port = 3000

mongoose.connect(process.env.DATABASE);

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true
}));

const adminRoute = require("../backend/routes/admin/index.route");
app.use(`/admin`, adminRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
