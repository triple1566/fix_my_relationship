package db

import (
	"database/sql"
	"log"

	_ "github.com/lib/pq"
)

//connstr format is:
// postgres://USER:PASSWORD@HOST:PORT/DATABASE?sslmode=disable
var connstr = "postgres://devuser:devpassword@localhost:5431/fixmyrelationship?sslmode=disable"

type user struct {
	Email string
	Username string
	Hash string
}

//Establishes a connection to the database. The db address is specified in db.go
func ConnectDatabase() (*sql.DB) {
	db, err:=sql.Open("postgres", connstr)
	if err!=nil{
		log.Println("Error: Database connection could not be established")
		log.Fatal(err)
	}
	err=db.Ping()
	if err!=nil{
		log.Fatal(err)
	}
	log.Println("Success: Database connection successful")

	return db
}

func Foo(db *sql.DB) (bool){
	exRow, err:=db.Query("select email, username, password_hash from users;")
	if err!=nil{
		log.Println("example query failed")
		return false
	}
	defer exRow.Close()

	exUser := user{}

	// Loop through row and map values into go struct (user)
	for exRow.Next() {
		// Scan for query values and store them
		// inside our equivalent struct values
		err:=exRow.Scan(&exUser.Email, &exUser.Username, &exUser.Hash)
		if err!=nil{log.Println(err)}
	}

	//for debugging: log.Println(exUser.Email+exUser.Username+exUser.Hash)

	if(exUser.Email=="example1@ex.com" && exUser.Username=="exampleuser1" && exUser.Hash=="examplehash"){
		return true
	}
	return false
}