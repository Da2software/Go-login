package routes

import (
	"github.com/Da2software/art-market/controllers"
	"github.com/gin-gonic/gin"
)

func Setup(app *gin.Engine) {
	app.GET("/ping", controllers.Ping)
	app.POST("/api/register", controllers.Register)
	app.POST("/api/login", controllers.Login)
	app.POST("/api/logout", controllers.Logout)
	app.POST("/api/user-auth", controllers.UserAuth)
}
