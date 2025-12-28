package main

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)


func main(){
	_=godotenv.Load()
	PORT:=os.Getenv("DEV_PORT")
	log.Println(PORT)
}