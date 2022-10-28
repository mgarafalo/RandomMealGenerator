import { useState } from 'react';
import { Dimensions, Linking, ScrollView, StyleSheet } from 'react-native';
import { Button, Card, Paragraph, Text, Title } from 'react-native-paper';
import { generateRandom } from '../components/actions';
import { View } from '../components/Themed';
import { Ingredients, RandomMealResponse } from '../components/types';
import { RootTabScreenProps } from '../types';

const screenWidth = Dimensions.get('window').width;

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<'TabOne'>) {
  const [randomMeal, setRandomMeal] = useState<RandomMealResponse | null>(null);

  async function handlePress() {
    await generateRandom().then(({ data }) => {
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
      setRandomMeal(obj);
    });
  }

  return (
    <View style={styles.container}>
      <Button icon='archive-search' onPress={() => handlePress()}>
        Random Meal
      </Button>
      {randomMeal !== null && (
        <ScrollView style={styles.scrollView}>
          <Card>
            <Card.Cover source={{ uri: randomMeal.strMealThumb }} />
            <Card.Content>
              <Title>{randomMeal.strMeal}</Title>
              <Text
                variant='bodySmall'
                onPress={() => Linking.openURL(randomMeal.strSource)}
              >
                View Entire Recipe
              </Text>

              <Title>Ingredients:</Title>
              <View style={styles.listItems}>
                {randomMeal.ingredients.map(
                  (group: Ingredients, index: number) => (
                    <Text key={index} variant='bodyMedium'>
                      {group.ingredient}: {group.measure}
                    </Text>
                  )
                )}
              </View>
              <Paragraph>{randomMeal.strInstructions}</Paragraph>
            </Card.Content>
          </Card>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  scrollView: {
    width: screenWidth,
  },
  list: {
    flex: 1,
  },
  listItems: {
    color: 'black',
    backgroundColor: 'white',
    marginBottom: 10,
    marginLeft: 10,
  },
});
