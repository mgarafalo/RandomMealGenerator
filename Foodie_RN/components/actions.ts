import axios, { AxiosResponse } from "axios";
import { RandomMealResponse } from "./types";

axios.defaults.baseURL = "https://api-jiluvzocbq-ue.a.run.app/api";
axios.defaults.baseURL = "http://localhost:3000/api";

export async function generateRandom() {
  const randomUrl = "https://www.themealdb.com/api/json/v1/1/random.php";
  return await axios.get(randomUrl).catch((error: any) => {
    console.log("error", error);
  });
}

export async function getAllMeals(userId: string = "1") {
  const { data } = await axios.get(`/meal`);
  return data;
}

export async function getSingleMeal(mealId: string) {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
  const { data } = await axios.get(url);
  return data;
}

export async function saveMeal(mealId: string, userId: string = "1") {
  console.log(mealId);
  await axios
    .post(`/meal/${mealId}`, { mealId, userId })
    .catch((error: any) => {
      console.log(error);
    });
}
