package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/mgarafalo/RandomMealGenerator/API/database"
	"github.com/mgarafalo/RandomMealGenerator/API/router"
)

func main() {
	app := fiber.New()

	// Default config
	app.Use(cors.New())

	// Or extend your config for customization
	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowHeaders:  "*",
	}))

	database.ConnectToDb()

	router.SetupRoutes(app)

	app.Listen(":8080")
}