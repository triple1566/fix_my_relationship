//TODO: implement bcrypt hashing to all password comparison/insertion

package router

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"os"

	"github.com/golang-jwt/jwt/v5"
	"github.com/joho/godotenv"
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
	mux.HandleFunc("/verifyauth", handleVerifyAuth)
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
						http.SetCookie(w, &http.Cookie{
							Name:     "access_token",
							Value:    resp.JWTtoken,
							Path:     "/",
							HttpOnly: true,
							//TODO: Enable https for everything in the future
							Secure:   false, // MUST be true in production (HTTPS)
							//TODO: Enable SameSiteStrictMode in the future
							SameSite: http.SameSiteLaxMode,
							MaxAge:   900, // 15 minutes
						})
						w.WriteHeader(http.StatusAccepted)
						encoder.Encode(map[string]string{"status": "OK"})
					}
				}
			}
		}
	}
}

func handleVerifyAuth(w http.ResponseWriter, r *http.Request) {
	cookie,err := r.Cookie("access_token")
	if err!=nil {
		http.Error(w,"Error: Login has expired", http.StatusUnauthorized)
		return
	}
	tokenstr:=cookie.Value
	claims := &auth.Claims{}
	_ = godotenv.Load()
	jwtSecretKey := os.Getenv("JWT_SECRET")
	token,err:=jwt.ParseWithClaims(tokenstr, claims, func(t *jwt.Token) (interface{}, error) {
			return []byte(os.Getenv(jwtSecretKey)), nil
	})

	if err!=nil || !token.Valid {
		http.Error(w,"Need user login",http.StatusUnauthorized)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]any{
		"user_id": claims.UserID,
	})
}