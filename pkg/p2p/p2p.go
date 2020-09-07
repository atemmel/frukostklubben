package p2p

import (
	"encoding/json"
	"net"
	"sync"
	"time"
)

type MessageType int

const(
	PeerPort = "7331"
	PeerConnectionType = "tcp"
	BrokerPort = "7332"
	BrokerConnectionType = "tcp"

	TextMessage = 0
	FKMessage = 1
)


type PeerMessage struct {
	Content string
	Type MessageType
}

type Peers struct {
	connsMutex sync.Mutex
	conns map[string]net.Conn
}

func NewPeers() Peers {
	var peers Peers
	peers.conns = make(map[string]net.Conn)
	return peers
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

func (peers *Peers) DistributeMessage(msg PeerMessage) error {
	data, err := json.Marshal(msg)
	if err != nil {
		return err
	}

	data = appendNewline(data)
	peers.connsMutex.Lock()
	defer peers.connsMutex.Unlock()
	for _, conn := range peers.conns {
		_, err = conn.Write(data)
		// TODO: Handle error in a responsible manner
	}
	return nil
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
