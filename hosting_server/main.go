package main

import (
    "fmt"
    "log"
    "net/http"
)


func main() {
    fs := http.FileServer(http.Dir("../webapp/build"))
    http.Handle("/", fs)

    fmt.Println("Starting server!")
    err := http.ListenAndServe(":8080", nil)
    if err != nil {
        log.Fatal(err)
    }
}