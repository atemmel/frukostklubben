package main

import (
	"encoding/json"

	"github.com/asticode/go-astilectron"
	bootstrap "github.com/asticode/go-astilectron-bootstrap"

	"fmt"
)

type Message struct {
	User string
	Message string
  }

// handleMessages handles messages
func handleMessages(_ *astilectron.Window, m bootstrap.MessageIn) (payload interface{}, err error) {
	
	// fmt.Println(m)

	// fmt.Println(m)
	
	var message string

	json.Unmarshal(m.Payload, &message)

	fmt.Println("!!!")
	fmt.Println(message)

	switch m.Name {
	case "explore":
		// Unmarshal payload

		var path string
		if len(m.Payload) > 0 {
			// Unmarshal payload
			if err = json.Unmarshal(m.Payload, &path); err != nil {
				payload = err.Error()
				return 
			} else {
				json.Unmarshal(m.Payload, &path)
				fmt.Println(path)
			}
		}



		// Handle cases here...
	}
	
	return
}
