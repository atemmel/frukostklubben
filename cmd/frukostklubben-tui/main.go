package main

import(
	"bufio"
	"fmt"
	"github.com/atemmel/go-electron/pkg/p2p"
	"os"
)

func main() {
	input := bufio.NewScanner(os.Stdin)

	fmt.Print("Enter your username: ")
	input.Scan()
	username := input.Text()
	entry := p2p.NewPunchInMessage(username)

	fmt.Println("Trying to punch...")
	msg, err := p2p.SendMessageToBroker(entry, p2p.BrokerConnectionType, "127.0.0.1", p2p.BrokerPort)
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

	fmt.Println("Staying inside program until user input...")
	input.Scan()

	exit := p2p.NewPunchOutMessage(username)
	msg, err = p2p.SendMessageToBroker(exit, p2p.BrokerConnectionType, "localhost", p2p.BrokerPort)
	if err != nil {
		panic(err)
	}
}
