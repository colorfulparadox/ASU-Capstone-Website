package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"
)

func main() {
	fs := http.FileServer(http.Dir("../webapp/build"))
	//http.Handle("/", fs)

	// Handle all of the requests
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		path := filepath.Join("../webapp/build", r.URL.Path)

		// Check if the requested file exists and if they do not serve index.html
		if _, err := os.Stat(path); os.IsNotExist(err) {
			http.ServeFile(w, r, "../webapp/build/index.html")
			return
		}
		fs.ServeHTTP(w, r)
	})

	fmt.Println("Starting server!")
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatal(err)
	}
}
