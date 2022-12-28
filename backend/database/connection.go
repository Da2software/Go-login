package database

import (
	"github.com/Da2software/art-market/models"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() {
	cnn, err := gorm.Open(sqlite.Open("database/main.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	DB = cnn

	cnn.AutoMigrate(&models.User{})
}
