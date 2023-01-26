package database

import (
	"fmt"
	"log"
	"strconv"

	"github.com/mgarafalo/RandomMealGenerator/API/config"
	model "github.com/mgarafalo/RandomMealGenerator/API/internal/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectToDb() {
	var err error
	p := config.Config("PGPORT")
	port, err := strconv.ParseUint(p, 10, 32)

	if err != nil {
		log.Println("Failed!")
	}

	dsn := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=require", config.Config("PGHOST"), port, config.Config("PGUSER"), config.Config("PGPASSWORD"), config.Config("PGNAME"))

	DB, err = gorm.Open(postgres.Open(dsn))

	if err != nil {
		panic("Failed to connect to DB")
	}

	fmt.Println("Connected to DB")

	DB.AutoMigrate(&model.Meal{})

}