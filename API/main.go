package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/mgarafalo/RandomMealGenerator/API/database"
	"github.com/mgarafalo/RandomMealGenerator/API/router"
)

func main() {
	app := fiber.New()

	database.ConnectToDb()

	router.SetupRoutes(app)

	app.Listen(":3000")
}