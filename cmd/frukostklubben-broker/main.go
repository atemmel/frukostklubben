package main

import(
	"github.com/atemmel/go-electron/pkg/p2p"
	"net"
	"log"
)

const(
	host = ""
)

// https://en.wikipedia.org/wiki/Hole_punching_(networking)
func main() {

	listener, err := net.Listen(p2p.BrokerConnectionType, host + ":" + p2p.BrokerPort)
	if err != nil {
		panic(err)
	}
	defer listener.Close()

	broker := p2p.NewBroker()

	log.Println("Listening on ", host + ":" + p2p.BrokerPort)
	for {
		conn, err := listener.Accept()
		if err != nil {
			log.Println("Error accepting: ", err.Error())
			continue;
		}
		go broker.HandleRequest(conn)
	}
}
