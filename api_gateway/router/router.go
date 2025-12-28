package router

import (
	"log"
	"net/http"
)

func AssignHandlers(mux *http.ServeMux) {
	mux.HandleFunc("/", handleRoot)
}

func handleRoot(w http.ResponseWriter, r *http.Request) {
	log.Println("Root is called")
}