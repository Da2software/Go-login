package controllers

import (
	"fmt"
	"net/http"
	"strconv"
	"time"

	"github.com/Da2software/art-market/database"
	"github.com/Da2software/art-market/models"
	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

const SecretKey = "kdnjsndjnd*jdnj212md"

type RegisterReq struct {
	EMAIL    string `json:"email" binding:"required"`
	PASSWORD string `json:"password" binding:"required"`
}
type UserResult struct {
	ID    uint
	EMAIL string
}

func Ping(response *gin.Context) {
	response.JSON(http.StatusOK, gin.H{
		"message": "pong",
	})
}

func Register(response *gin.Context) {
	var req RegisterReq
	response.BindJSON(&req)

	password, _ := bcrypt.GenerateFromPassword([]byte(req.PASSWORD), 14)

	user := models.User{
		Email:    req.EMAIL,
		Password: password,
	}

	database.DB.Create(&user)

	response.JSON(http.StatusOK, gin.H{
		"user": user,
	})
}

func Login(response *gin.Context) {
	var req RegisterReq
	response.BindJSON(&req)

	var user models.User
	database.DB.Where("email = ?", req.EMAIL).First(&user)
	if user.Id == 0 {
		response.JSON(http.StatusNotFound, gin.H{
			"message": "user not found",
		})
		return
	}

	if err := bcrypt.CompareHashAndPassword(user.Password,
		[]byte(req.PASSWORD)); err != nil {
		response.JSON(http.StatusForbidden, gin.H{
			"message": "Wrong Password",
		})
		return
	}

	claims := jwt.NewWithClaims(jwt.SigningMethodHS256,
		jwt.StandardClaims{
			Issuer:    strconv.Itoa(int(user.Id)),
			ExpiresAt: time.Now().Add(time.Hour * 24).Unix(),
		})

	token, err := claims.SignedString([]byte(SecretKey))

	if err != nil {
		fmt.Println(err)
		response.JSON(http.StatusInternalServerError, gin.H{
			"message": "could not login",
		})
		return
	}

	response.SetCookie("jwt", token,
		3600, "/", "localhost", false, true)

	response.JSON(http.StatusOK, gin.H{
		"message": "success",
	})
}

func UserAuth(response *gin.Context) {
	cookie, err := response.Cookie("jwt")
	if err != nil {
		response.JSON(http.StatusForbidden, gin.H{
			"message": "unauthenticated",
		})
		return
	}

	token, err := jwt.ParseWithClaims(cookie, &jwt.StandardClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(SecretKey), nil
	})

	if err != nil {
		response.JSON(http.StatusForbidden, gin.H{
			"message": "unauthenticated",
		})
		return
	}

	claims := token.Claims.(*jwt.StandardClaims)

	var user models.User

	database.DB.Where("id = ?", claims.Issuer).First(&user)

	var resUser = UserResult{user.Id, user.Email}
	response.JSON(http.StatusOK, gin.H{
		"User": resUser,
	})
}

func Logout(response *gin.Context) {
	response.SetCookie("jwt", "", 0, "/",
		"localhost", false, true)
	response.JSON(http.StatusOK, gin.H{
		"message": "success",
	})
}
