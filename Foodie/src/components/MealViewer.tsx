import { DownloadIcon } from "@chakra-ui/icons";
import { Box, Button, Card, IconButton, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { generateRandom, getSingleMeal, saveMeal } from "../API/actions";
import { Ingredients, RandomMealResponse } from "../types/types";

interface props {
  meal: RandomMealResponse;
}

// const screenWidth = Dimensions.get("window").width;

export default function MealViewer({ meal }: props) {
  async function handleSaveMeal() {
    await saveMeal(meal?.idMeal!, meal!.strMeal, "1");
  }

  return (
    <Card className="p-3">
      <Box className="w-full flex flex-col items-center">
        <Box className="flex flex-row items-center gap-3">
          <Text>{meal!.strMeal}</Text>
          <IconButton
            aria-label="save"
            icon={<DownloadIcon />}
            // icon='save'
            onClick={() => handleSaveMeal()}
          >
            Save Meal
          </IconButton>
        </Box>

        <Text
          variant="bodySmall"
          onClick={() => (window.location.href = meal!.strSource)}
        >
          View Entire Recipe
        </Text>
        <Image
          style={{ display: "inline" }}
          width={300}
          height={300}
          src={meal!.strMealThumb}
        />
      </Box>
      <Box>
        <Text>Ingredients:</Text>
        <Box className="flex">
          {meal!.ingredients.map((group: Ingredients, index: number) => (
            <Text key={index} variant="bodyMedium">
              {group.ingredient}: {group.measure}
            </Text>
          ))}
        </Box>
        <Text>{meal!.strInstructions}</Text>
      </Box>
    </Card>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//   },
//   scrollView: {
//     height: 100,
//     width: screenWidth,
//   },
//   list: {
//     flex: 1,
//   },
//   listItems: {
//     color: "black",
//     backgroundColor: "white",
//     marginBottom: 10,
//     marginLeft: 10,
//   },
//   titleContainer: {
//     flexDirection: "row",
//   },
//   saveBtn: {
//     paddingLeft: 8,
//     alignItems: "center",
//     justifyContent: "space-between",
//   },
// });
