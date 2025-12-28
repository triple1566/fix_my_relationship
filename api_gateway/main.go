package main

import (
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
	"github.com/triple1566/fix_my_relationship/router"
)


func main() {
	// Load environment variables from .env if present
	_ = godotenv.Load()

	// Prefer PORT, fallback to DEV_PORT, then default to 8080
	port := os.Getenv("PORT")
	if port == "" {
		port = os.Getenv("DEV_PORT")
	}
	if port == "" {
		port = "8080"
	}

	mux := http.NewServeMux()
	router.AssignHandlers(mux)

	log.Println("Starting server on :" + port)
	if err := http.ListenAndServe(":"+port, mux); err != nil {
		log.Fatal(err)
	}
}