package main

import (
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
	"github.com/triple1566/fix_my_relationship/db"
	"github.com/triple1566/fix_my_relationship/router"
)

func main() {
	// Establish connection to database================================

	newDatabase:=db.ConnectDatabase()
	defer newDatabase.Close()
	if db.Foo(newDatabase) {
		log.Println("Success: Test query successful")
	}else {log.Println("Error: Test query failed")}

	// Server startup========================================

	// Load environment variables from .env if present
	_ = godotenv.Load()

	// Prefer PORT, fallback to DEV_PORT, then default to 8080
	jwtSecretKey := os.Getenv("JWT_SECRET")
	port := os.Getenv("PORT")
	if port == "" {
		port = os.Getenv("DEV_PORT")
	}
	if port == "" {
		port = "8080"
	}

	mux := http.NewServeMux()
	router.AssignHandlers(mux, newDatabase, jwtSecretKey)

	log.Println("Starting server on :" + port)
	if err := http.ListenAndServe(":"+port, enableCORS(mux)); err != nil {
		log.Fatal(err)
	}
}

//TODO: Tighten CORS before deployment
func enableCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		w.Header().Set("Access-Control-Allow-Origin", r.Header.Get("Origin"))
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		w.Header().Set("Access-Control-Allow-Credentials", "true")

		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
			return
		}

		next.ServeHTTP(w, r)
	})
}