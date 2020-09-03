package main

import(
	"bufio"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"github.com/atemmel/go-electron/pkg/p2p"
	"os"
)

const configPath = "client.json"

type ClientConfig struct {
	BrokerAddress string
}

func main() {
	conf := ClientConfig{}
	data, err := ioutil.ReadFile(configPath)
	if err == nil {
		err = json.Unmarshal(data, &conf)
		if err != nil {
			fmt.Println("Could not parse client config!")
		}
	} else {
		fmt.Println("Could not read file '" + configPath + "'")
	}

	input := bufio.NewScanner(os.Stdin)

	fmt.Print("Enter your username: ")
	input.Scan()
	username := input.Text()
	entry := p2p.NewPunchInMessage(username)

	fmt.Println("Trying to punch...")
	msg, err := p2p.SendMessageToBroker(entry, p2p.BrokerConnectionType, conf.BrokerAddress, p2p.BrokerPort)
	if err != nil {
		panic(err)
	}

	if !msg.Connected {
		fmt.Println("Could not connect to broker, username was already in use")
		return
	}

	fmt.Println("Successfully recieved peers!")
	for k, e := range msg.Peers {
		fmt.Println("User", k, "is connected from", e)
	}

	loop(input)

	exit := p2p.NewPunchOutMessage(username)
	msg, err = p2p.SendMessageToBroker(exit, p2p.BrokerConnectionType, conf.BrokerAddress, p2p.BrokerPort)
	if err != nil {
		panic(err)
	}
}

func loop(input *bufio.Scanner) {
	for {
		input.Scan()
		switch input.Text() {
			case "exit":
				return
			case "/fk":
				fk := p2p.RandFrukost()
				fmt.Println("Todays frukost:", fk.Name)
			default:
		}
	}
}
