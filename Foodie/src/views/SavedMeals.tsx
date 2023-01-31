import { CloseIcon } from "@chakra-ui/icons";
import { Box, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useNavigation } from "react-router-dom";
import { deleteMeal, getAllMeals, getSingleMeal } from "../API/actions";
import MealViewer from "../components/MealViewer";
import {
  RandomMealResponse,
  SavedMeal,
  SavedMealsResponse,
} from "../types/types";

export default function SavedMeals() {
  const navigate = useNavigate();

  const [allMeals, setAllMeals] = useState<SavedMeal[] | null>(null);

  const [meal, setMeal] = useState<RandomMealResponse>();

  async function getMealData(mealId: string) {
    await getSingleMeal(mealId).then((data) => {
      const arr = Object.entries(data.meals[0]);
      const temp: any = [];
      arr.forEach((item: any) => {
        if (item[0].includes("Ingredient") && item[1] !== "") {
          const measure = arr.filter(
            (value: any) =>
              value[0] === `strMeasure${item[0][item[0].length - 1]}`
          )[0];
          temp.push({
            ingredient: item[1],
            measure: measure && measure[1] !== "" ? measure[1] : "",
          });
        }
      });
      for (const item in data.meals[0]) {
        if (item.includes("strIngredient") || item.includes("strMeasure")) {
          delete data.meals[0][item];
        }
      }
      const obj: RandomMealResponse = { ...data.meals[0], ingredients: temp };
      setMeal(obj);
    });
  }

  async function loadData(): Promise<void> {
    await getAllMeals()
      .then((response: SavedMealsResponse) => {
        setAllMeals(response.meals);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  async function handleDelete(mealId: string) {
    await deleteMeal(mealId).then(() => {
      loadData();
    });
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Box className="flex flex-col p-5">
      <Box className="flex flex-col items-center justify-center w-full p-5">
        {allMeals !== null &&
          allMeals.map((meal, i) => (
            <Box key={i} className="flex flex-row items-center gap-5">
              <Text
                variant="bodyMedium"
                onClick={() => getMealData(meal.mealId)}
              >
                {meal.mealId} {meal.title}
              </Text>
              <CloseIcon onClick={() => handleDelete(meal.mealId)} />
            </Box>
          ))}
      </Box>
      {meal && <MealViewer meal={meal} />}
    </Box>
  );
}
