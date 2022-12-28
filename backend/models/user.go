package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Id        uint
	Email     string `gorm:"unique"`
	Password  []byte
	Deleted   bool `gorm:"default:0"`
	Validated bool `gorm:"default:0"`
}
