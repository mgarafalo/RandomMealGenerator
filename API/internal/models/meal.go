package model

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Meal struct {
	gorm.Model
	ID uuid.UUID `gorm:"type:uuid"`
	UserId string `json:"userId"`
	MealId string `json:"mealId"`
	Title string `json:"title"`
}