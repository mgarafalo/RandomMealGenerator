import { useEffect, useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { getSingleMeal } from '../components/actions';
import MealViewer from '../components/MealViewer';
import { View } from '../components/Themed';
import { RandomMealResponse, SavedMeal } from '../components/types';

interface props {
  route: any;
}

export default function SingleMealScreen({ route }: props) {
  const [mealData, setMealData] = useState<RandomMealResponse | null>(null);

  async function loadData(mealId: string) {
    await getSingleMeal(mealId)
      .then((data) => {
        const arr = Object.entries(data.meals[0]);
        const temp: any = [];
        arr.forEach((item: any) => {
          if (item[0].includes('Ingredient') && item[1] !== '') {
            const measure = arr.filter(
              (value: any) =>
                value[0] === `strMeasure${item[0][item[0].length - 1]}`
            )[0];
            temp.push({
              ingredient: item[1],
              measure: measure && measure[1] !== '' ? measure[1] : '',
            });
          }
        });
        for (const item in data.meals[0]) {
          if (item.includes('strIngredient') || item.includes('strMeasure')) {
            delete data.meals[0][item];
          }
        }
        const obj: RandomMealResponse = { ...data.meals[0], ingredients: temp };
        setMealData(obj);
      })
      .catch((error: any) => {
        console.log('error', error);
      });
  }

  useEffect(() => {
    loadData(route.params.id);
  }, []);

  return (
    <View style={styles.container}>
      {mealData !== null && <MealViewer meal={mealData} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
