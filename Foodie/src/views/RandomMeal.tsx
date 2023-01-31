import { SearchIcon } from "@chakra-ui/icons";
import { Box, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import { generateRandom } from "../API/actions";
import MealViewer from "../components/MealViewer";
import { RandomMealResponse } from "../types/types";

export default function RandomMeal() {
  const [randomMeal, setRandomMeal] = useState<RandomMealResponse | null>(null);

  async function handlePress() {
    await generateRandom().then((data) => {
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
      setRandomMeal(obj);
    });
  }

  return (
    <Box className="flex flex-col gap-3 items-center justify-center w-full">
      <IconButton
        aria-label="search"
        icon={<SearchIcon />}
        onClick={() => handlePress()}
      >
        Random Meal
      </IconButton>
      {randomMeal !== null && <MealViewer meal={randomMeal} />}
    </Box>
  );
}
