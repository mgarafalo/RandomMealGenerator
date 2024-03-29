import { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Title, Text } from "react-native-paper";
import { getAllMeals } from "../components/actions";
import { View } from "../components/Themed";
import { SavedMeal, SavedMealsResponse } from "../components/types";
import { RootTabScreenProps } from "../types";

export default function TabTwoScreen({
  navigation,
}: RootTabScreenProps<"TabTwo">) {
  const [allMeals, setAllMeals] = useState<SavedMeal[] | null>(null);

  async function loadData(): Promise<void> {
    await getAllMeals()
      .then((response: SavedMealsResponse) => {
        setAllMeals(response.meals);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {allMeals !== null &&
          allMeals.map((meal, i) => (
            <Text
              key={meal.mealId}
              style={styles.item}
              variant="bodyMedium"
              onPress={() =>
                navigation.navigate("SingleMeal", { id: meal.mealId })
              }
            >
              {meal.mealId}
            </Text>
          ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  scrollView: {
    height: 100,
  },
  item: {
    paddingBottom: 5,
  },
});
