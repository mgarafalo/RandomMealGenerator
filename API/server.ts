import express, { Request, Response } from 'express';
import * as cors from 'cors';
import * as dotenv from 'dotenv';
import { collection, connectToDatabase } from './persistence/mongoService';
import { Meal } from './models/meal';

dotenv.config();

const app = express();
const PORT = 8080;

app.use(cors.default());

app.get('/meals/all', async (req, res) => {
  await connectToDatabase().then(async () => {
    const meals = await collection.Meals!.find({}).toArray();
    res.send(meals);
  });
});

app.post('/meals/new', async (req, res) => {
  await connectToDatabase().then(() => {
    const meal = new Meal({
      mealId: req.query.mealId,
      userId: req.query.userId,
    });
    collection.Meals?.insertOne(meal);
    res.send(200);
  });
});

app.listen(PORT, () => {
  console.log('app is running', PORT);
});
