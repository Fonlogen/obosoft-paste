/* eslint-disable no-undef */
import express from 'express';
import mongodb from 'mongodb';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config({
  path: './.env'
});

const DB_CONNECTION_STRING = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.jacxl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

console.log(DB_CONNECTION_STRING);

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// // Connect to MongoDB
const client = new mongodb.MongoClient(DB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Basic route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/v1/paste/getPasteList/:username', async (req, res) => {
  const username = req.params.username;
  const db = client.db('obosoft');
  console.log(username);
  const pasteList = await db.collection('pastes').find({ 'owner': username }).toArray();
  res.json(pasteList);
});

app.get('/api/v1/paste/getPaste/:id', async (req, res) => {
  const id = req.params.id;
  const db = client.db('obosoft');
  const paste = await db.collection('pastes').findOne({ '_id': new mongodb.ObjectId(id) });
  console.log(paste);
  res.json(paste);
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

