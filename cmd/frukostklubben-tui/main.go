package main

import (
	"bufio"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"github.com/atemmel/frukostklubben/pkg/p2p"
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

	peers := p2p.NewPeers(username)

	err = peers.PunchIn(conf.BrokerAddress)
	if err != nil {
		panic(err)
	}

	running := true
	for running {
		input.Scan()
		switch input.Text() {
		case "exit":
			running = false
		case "/fk":
			fk := p2p.RandFrukost()
			fmt.Println("Todays frukost:", fk.Name)
		default:
			pmsg := constructMessage(input.Text())
			peers.DistributeMessage(pmsg)
		}
	}

	err = peers.PunchOut(conf.BrokerAddress)
	if err != nil {
		panic(err)
	}
}

func constructMessage(str string) p2p.PeerMessage {
	return p2p.PeerMessage{
		Content: str,
		Type:    p2p.TextMessage,
	}
}
