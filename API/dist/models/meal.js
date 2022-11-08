"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Meal = void 0;
const mongoose_1 = require("mongoose");
const mealSchema = new mongoose_1.Schema({
    mealId: { type: String, required: true },
    userId: { type: String, required: true },
});
exports.Meal = (0, mongoose_1.model)('Meal', mealSchema);
