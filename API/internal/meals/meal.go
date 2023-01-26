package mealRoutes

import (
	"github.com/gofiber/fiber/v2"
	mealHandler "github.com/mgarafalo/RandomMealGenerator/API/internal/handlers/meal"
)

func SetupRoutes(router fiber.Router) error {
	meal := router.Group("/meal")

	meal.Get("/", mealHandler.GetMeals)
	meal.Get("/:mealId", mealHandler.GetSingleMeal)
	meal.Post("/:mealId", mealHandler.CreateMeal)
	meal.Delete("/:mealId", mealHandler.DeleteMeal)

	return nil
}