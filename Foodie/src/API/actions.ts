import axios, { AxiosPromise, AxiosResponse } from "axios";

// axios.defaults.baseURL = "https://api-jiluvzocbq-ue.a.run.app/api";
// axios.defaults.baseURL = "http://localhost:3000/api";

export async function generateRandom() {
  const randomUrl = "https://www.themealdb.com/api/json/v1/1/random.php";
  const { data } = await axios.get(randomUrl);

  return data;
}

export async function getAllMeals(userId: string = "1") {
  const { data } = await axios.get(
    `https://api-jiluvzocbq-ue.a.run.app/api/meal`,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
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
    .post(
      `https://api-jiluvzocbq-ue.a.run.app/api/meal/${mealId}`,
      {
        mealId,
        userId,
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    )
    .catch((error: any) => {
      console.log(error);
    });
}
