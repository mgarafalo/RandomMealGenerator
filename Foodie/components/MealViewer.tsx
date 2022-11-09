import { Dimensions, Linking, ScrollView, StyleSheet } from 'react-native';
import { Button, Card, Paragraph, Title, Text } from 'react-native-paper';
import { saveMeal } from './actions';
import { View } from './Themed';
import { Ingredients, RandomMealResponse } from './types';

interface props {
  meal: RandomMealResponse;
}

const screenWidth = Dimensions.get('window').width;

export default function MealViewer({ meal }: props) {
  async function handleSaveMeal() {
    await saveMeal(meal?.idMeal!, '1', meal?.strMeal);
  }

  return (
    <ScrollView style={styles.scrollView}>
      <Card>
        <Card.Cover source={{ uri: meal.strMealThumb }} />
        <Card.Content>
          <View style={styles.titleContainer}>
            <Title>{meal.strMeal}</Title>
            <Button
              style={styles.saveBtn}
              // icon='save'
              onPress={() => handleSaveMeal()}
            >
              Save Meal
            </Button>
          </View>
          <Text
            variant='bodySmall'
            onPress={() => Linking.openURL(meal.strSource)}
          >
            View Entire Recipe
          </Text>

          <Title>Ingredients:</Title>
          <View style={styles.listItems}>
            {meal.ingredients.map((group: Ingredients, index: number) => (
              <Text key={index} variant='bodyMedium'>
                {group.ingredient}: {group.measure}
              </Text>
            ))}
          </View>
          <Paragraph>{meal.strInstructions}</Paragraph>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  scrollView: {
    height: 100,
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
  titleContainer: {
    flexDirection: 'row',
  },
  saveBtn: {
    paddingLeft: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
