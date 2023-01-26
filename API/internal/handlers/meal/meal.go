package mealHandler

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"github.com/mgarafalo/RandomMealGenerator/API/database"
	model "github.com/mgarafalo/RandomMealGenerator/API/internal/models"
)

func GetMeals(c *fiber.Ctx) error {
	db := database.DB
	var meals []model.Meal

	db.Find(&meals)

	if len(meals) == 0 {
		return c.Status(404).JSON(fiber.Map{"erorr": "No meal ids"})
	}

	return c.JSON(fiber.Map{"meals": meals})
}

func GetSingleMeal(c *fiber.Ctx) error {
	db := database.DB
	var meal model.Meal

	id := c.Params("mealId")

	db.Find(&meal, "mealId = ?", id)

	if meal.ID == uuid.Nil {
		return c.Status(404).JSON(fiber.Map{"error": "Meal not found"})
	}

	return c.JSON(fiber.Map{"meal": meal})
}

func CreateMeal(c *fiber.Ctx) error {
	db := database.DB
	meal :=  new(model.Meal)

	err := c.BodyParser(meal)

	if err != nil {
		return c.Status(404).JSON(fiber.Map{"Error": "Check your input", "data": err, "bodyParse": c.BodyParser(meal)})
	}

	meal.ID = uuid.New()

	err = db.Create(&meal).Error

	if err != nil {
		return c.Status(404).JSON(fiber.Map{"Error": "Failed"})
	}
	log.Println(meal)
	return c.JSON(fiber.Map{"New Meal": meal})
}

func DeleteMeal(c *fiber.Ctx) error {
	db := database.DB
	var meal model.Meal

	id := c.Params("id")

	db.Find(&meal, "mealId = ?", id)

	if meal.ID == uuid.Nil {
		return c.Status(404).JSON(fiber.Map{"error": "Meal not found"})
	}

	err := db.Delete(&meal, "mealId = ?", id).Error

	if err != nil {
		return c.Status(404).JSON(fiber.Map{"Error": "Failed to delete meal"})
	}

	return c.JSON(fiber.Map{"Message": "Deleted meal"})


}