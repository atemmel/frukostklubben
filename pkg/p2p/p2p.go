package p2p

import (
	"net"
	"sync"
	"time"
)

const(
	PeerPort = "7331"
	PeerConnectionType = "tcp"
	BrokerPort = "7332"
	BrokerConnectionType = "tcp"
)

type MessageType int

type PeerMessage struct {
	Content string
	Type MessageType
}

type Peers struct {
	connsMutex sync.Mutex
	conns map[string]net.Conn
}

func (peers *Peers) AddConnection(username string, connectionType string, addr string, port string) {
	for i := 0; i < 5; i++ {
		conn, err := net.Dial(connectionType, addr + ":" + port)
		if err != nil {
			time.Sleep(time.Second * 1)
			continue
		}

		peers.connsMutex.Lock()
		peers.conns[username] = conn
		peers.connsMutex.Unlock()
		break
	}
}

/*
func listen(conn net.Conn) {
	reader := bufio.NewReader(conn)
	for {
		data, err := reader.ReadString('\n')
		if err != nil {

		}
	}
}
*/
