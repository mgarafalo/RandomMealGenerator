import { model, Schema } from 'mongoose';

export interface Meal {
  mealId: Number;
  userId: Number;
}

const mealSchema = new Schema<Meal>({
  mealId: { type: String, required: true },
  userId: { type: String, required: true },
});

export const Meal = model<Meal>('Meal', mealSchema);
