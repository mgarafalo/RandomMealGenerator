import { model, Schema } from 'mongoose';

export interface Meal {
  mealId: String;
  userId: String;
  title: String;
}

const mealSchema = new Schema<Meal>({
  mealId: { type: String, required: true },
  userId: { type: String, required: true },
  title: { type: String, required: false },
});

export const Meal = model<Meal>('Meal', mealSchema);
