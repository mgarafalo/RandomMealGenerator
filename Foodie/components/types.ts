export interface RandomMealResponse {
  idMeal: string;
  strMeal: string;
  strDrinkAlternate?: any;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string;
  strYoutube: string;
  ingredients: Ingredients[];
  strSource?: any;
  strImageSource?: any;
  strCreativeCommonsConfirmed?: any;
  dateModified?: any;
}

export interface Ingredients {
  ingredient: string;
  measure: string;
}

export interface SavedMeal {
  _id: string;
  mealId: string;
  userId: string;
  title: string;
}
