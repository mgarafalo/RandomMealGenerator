package router

import (
	"github.com/gofiber/fiber/v2"
	mealRoutes "github.com/mgarafalo/RandomMealGenerator/API/internal/meals"
)

func SetupRoutes(app *fiber.App) error {
	api := app.Group("/api")

	mealRoutes.SetupRoutes((api))

	return nil
}