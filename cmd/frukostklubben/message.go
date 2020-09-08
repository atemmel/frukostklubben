package main

import (
	"encoding/json"

	"github.com/asticode/go-astilectron"
	bootstrap "github.com/asticode/go-astilectron-bootstrap"

	"log"
)

// type Message struct {
// 	User string
// 	Message string
//   }

// handleMessages handles messages
func handleMessages(w *astilectron.Window, m bootstrap.MessageIn) (payload interface{}, err error) {
	
	// var message string
	// fmt.Println(m)

	log.Println("!!!")
	log.Println(m)

	// m.Unmarshal(&message)
	// fmt.Println(message)

	log.Println("Name:")
	log.Println(m.Name)

	switch m.Name {
	case "explore":
		// Unmarshal payload
		var path string
		if len(m.Payload) > 0 {
			// Unmarshal payload
			if err = json.Unmarshal(m.Payload, &path); err != nil {
				payload = err.Error()
				return
			}
		}
	}
	return
}