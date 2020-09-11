package p2p

import (
	"encoding/json"
	"errors"
	"net"
	"sync"
	"log"
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
	username string
	connsMutex sync.Mutex
	conns map[string]net.Conn
	msgChan chan []byte
	joinChan chan net.Conn
	leaveChan chan net.Conn
	listener net.Listener
}

func NewPeers(username string) Peers {
	return Peers{
		username: username,
		conns: make(map[string]net.Conn),
		msgChan:  make(chan []byte),
		joinChan: make(chan net.Conn),
		leaveChan: make(chan net.Conn),
	}
}

func (peers *Peers) PunchIn(brokerAddress string) error {
	entry := NewPunchInMessage(peers.username)
	log.Println("Trying to punch...")
	msg, err := SendMessageToBroker(entry, BrokerConnectionType, brokerAddress, BrokerPort)
	if err != nil {
		return err
	}

	if !msg.Connected {
		return errors.New("Could not connect to broker, username was already in use")
	}

	log.Println("Successfully recieved peers!")

	for k, e := range msg.Peers {
		log.Println("User", k, "is connected from", e)
	}

	go peers.Listen()
	for user, ip := range msg.Peers {
		if user != peers.username {
			peers.AddConnection(user, PeerConnectionType, ip)
		}
	}

	return nil
}

func (peers *Peers) PunchOut(brokerAddress string) error {
	exit := NewPunchOutMessage(peers.username)
	_, err := SendMessageToBroker(exit, BrokerConnectionType, brokerAddress, BrokerPort)
	return err
}

func (peers *Peers) AddConnection(username string, connectionType string, addr string) {
	conn, err := net.Dial(connectionType, addr + ":" + PeerPort)
	if err != nil {
		log.Println(err)
		return
	}

	peers.connsMutex.Lock()
	peers.conns[username] = conn
	peers.connsMutex.Unlock()
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

func (peers *Peers) Listen() {
	var err error
	peers.listener, err = net.Listen(PeerConnectionType, ":" + PeerPort);
	if err != nil {
		panic(err)
	}

	go peers.acceptConnections();

	for {
		select {
			case conn := <-peers.joinChan:
				log.Println("New connection:", conn.RemoteAddr().String())
			case conn := <-peers.leaveChan:
				log.Println("Lost connection:", conn.RemoteAddr().String())

			case msg := <-peers.msgChan:
				var peerMsg *PeerMessage
				err := json.Unmarshal(msg, peerMsg);
				if err != nil {
					log.Println(err)
				} else {
					log.Println(*peerMsg)
				}
		}
	}
}

func (peers *Peers) acceptConnections() {
	for {
		conn, err := peers.listener.Accept()
		if err != nil {
			log.Println(err)
		} else {
			peers.joinChan <- conn
		}
	}
}
