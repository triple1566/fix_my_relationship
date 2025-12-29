package router

import (
	"encoding/json"
	"log"
	"net/http"
)

type statusResponse struct{
	ServerState string `json:"ServerState"`;
}

func AssignHandlers(mux *http.ServeMux) {
	mux.HandleFunc("/", handleRoot)
}

func handleRoot(w http.ResponseWriter, r *http.Request) {
	resp:=statusResponse{
		ServerState: "true",
	}
	//log.Println(resp.ServerState)
	encoder := json.NewEncoder(w)
	w.WriteHeader(http.StatusOK)
	err:=encoder.Encode(resp)
	if err!=nil{
		log.Println("Server failed to send to client")
	}
}