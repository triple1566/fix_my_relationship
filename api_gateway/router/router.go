//TODO: implement bcrypt hashing to all password comparison/insertion

package router

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"

	"github.com/triple1566/fix_my_relationship/auth"
)

type statusResponse struct{
	ServerState string `json:"ServerState"`;
}

type loginRequest struct {
	Email string `json:"UserEmail"`;
	Password string `json:"UserPassword"`;
}
type loginResponse struct {
	JWTtoken string `json:"jwt"`;
}

func AssignHandlers(mux *http.ServeMux, db *sql.DB, jwtSecretKey string) {
	mux.HandleFunc("/", handleRoot)
	mux.HandleFunc("/login",handleLogin(db,jwtSecretKey))
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

func handleLogin(db *sql.DB, jwtSecretKey string) http.HandlerFunc{
	return func(w http.ResponseWriter, r *http.Request) {
		if(r.Method!="POST") {
			log.Println("Error: Login call method is not POST")
			http.Error(w, "Error: Login call method is not POST",http.StatusBadRequest)
		} else {
			decoder := json.NewDecoder(r.Body)
			encoder := json.NewEncoder(w)

			// Storage struc for email and password from login request
			req := loginRequest{
				Email: "", Password: "",
			}

			err := decoder.Decode(&req)
			if err!=nil {
				log.Println("Error: Login call not parsable")
				http.Error(w, "Error: Login call not parsable",http.StatusBadRequest)
			}

			// At this point, email and password from client side is stored
			id := -1
			email := ""
			password := ""
			// Struct for the login response
			resp := loginResponse{
				JWTtoken: "",
			}

			rows:=db.QueryRow("SELECT id, email, password_hash FROM users WHERE email = $1", req.Email)
			err=rows.Scan(&id, &email, &password)
			if err!=nil{
				http.Error(w,"Error: InvalidCredentials", http.StatusUnauthorized)
			} else {
				//adding an if just to be sure... I don't trust in myself
				if email==req.Email && password==req.Password{
					// if user exists in the database, create jwt auth token and send it to the client
					binaryKey := []byte(jwtSecretKey)
					resp.JWTtoken, err=auth.CreateJWT(id, binaryKey)
					if err!=nil{
						log.Println("Error: Jwt token creation failed")
						http.Error(w,"Error: Jwt token creation failed", http.StatusInternalServerError)
					} else{
						w.WriteHeader(http.StatusAccepted)
						encoder.Encode(resp)
					}
				}
			}
		}
	}
}