import axios, { AxiosResponse } from 'axios';
import { RandomMealResponse } from './types';

export async function generateRandom(): Promise<any> {
  const randomUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';
  return await axios.get(randomUrl).catch((error: any) => {
    console.log('error', error);
  });
}

export async function getAllMeals(userId: string = '1'): Promise<any> {
  const { data } = await axios.get(
    `http:localhost:8080/meals/all?userId=${userId}`
  );
  return data;
}

export async function getSingleMeal(mealId: string): Promise<any> {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
  const { data } = await axios.get(url);
  return data;
}

export async function saveMeal(
  mealId: string,
  userId: string = '1',
  title: string = ''
): Promise<any> {
  await axios
    .post(
      `http://localhost:8080/meals/new?mealId=${mealId}&userId=${userId}&title=${title}`
    )
    .catch((error: any) => {
      console.log(error);
    });
}
