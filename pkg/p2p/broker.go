package p2p

import(
	"bufio"
	"encoding/json"
	"strings"
	"sync"
	"net"
	"log"
)

const (
	punchIn = 0
	punchOut = 1
)

type messageType int

type punchInMessage struct {
	Username string
}

type punchOutMessage struct {
	Username string
}

type ToBrokerMessage struct {
	MessageType messageType
	Contents string
}

type FromBrokerMessage struct {
	Connected bool
	Peers map[string]string
}

type Broker struct {
	ledgerMutex sync.Mutex
	// username to ip
	ledger map[string]string
}

func NewBroker() *Broker {
	return &Broker{
		ledger: make(map[string]string),
	}
}

func (broker *Broker)HandleRequest(conn net.Conn) {
	log.Println("New request from:", conn.RemoteAddr().String())
	defer conn.Close()
	reader := bufio.NewReader(conn)
	data, err := reader.ReadBytes('\n')
	if err != nil {
		log.Println("Error handling request:", err.Error())
		return
	}

	msg := &ToBrokerMessage{}
	err = json.Unmarshal(data, msg)
	if err != nil {
		log.Println("Error marshaling data:", err.Error())
		return
	}

	switch msg.MessageType {
		case punchIn:
			broker.handlePunchInRequest(conn, msg)
		case punchOut:
			broker.handlePunchOutRequest(conn, msg)
		default:
			log.Println("Unrecognized enum type:", msg.MessageType)
	}
}

func (broker *Broker)handlePunchInRequest(conn net.Conn, msg *ToBrokerMessage) {
	log.Println("Punch in message recieved")
	punch := punchInMessage{}
	err := json.Unmarshal([]byte(msg.Contents), &punch)
	if err != nil {
		broker.cancelPunchRequest(conn)
		return
	}

	broker.ledgerMutex.Lock()
	if punch.Username != "" && broker.ledger[punch.Username] == "" {
		broker.ledger[punch.Username] = strings.Split(conn.RemoteAddr().String(), ":")[0])
	} else {
		broker.cancelPunchRequest(conn)
		return
	}
	broker.ledgerMutex.Unlock()

	err = broker.writeFromBroker(conn)
	if err != nil {
		log.Println("Could not write ledger to connection")
	}
}

func (broker *Broker)handlePunchOutRequest(conn net.Conn, msg *ToBrokerMessage) {
	log.Println("Punch out message recieved")
	punch := punchOutMessage{}
	err := json.Unmarshal([]byte(msg.Contents), &punch)
	if err != nil {
		broker.cancelPunchRequest(conn)
		return
	}

	broker.ledgerMutex.Lock()
	if punch.Username != "" && broker.ledger[punch.Username] != "" {
		delete(broker.ledger, punch.Username)
	} else {
		broker.cancelPunchRequest(conn)
		return
	}
	broker.ledgerMutex.Unlock()

	err = broker.writeFromBroker(conn)
	if err != nil {
		log.Println("Could not write ledger to connection")
	}
}

func (broker *Broker) writeFromBroker(conn net.Conn) error {
	broker.ledgerMutex.Lock()
	msg := FromBrokerMessage{
		Connected: true,
		Peers: broker.ledger,
	}
	broker.ledgerMutex.Unlock()
	data, err := json.Marshal(msg)
	if err != nil {
		log.Println(err)
		badbyte := []byte{'\n'}
		conn.Write(badbyte)
		return err
	}
	data = appendNewline(data)

	_, err = conn.Write(data)
	if err != nil {
		log.Println("Could not write data to connection:", err)
		return err
	}
	return nil
}

func (broker *Broker) cancelPunchRequest(conn net.Conn) error {
	msg := FromBrokerMessage{
		Connected: false,
		Peers: nil,
	}
	data, err := json.Marshal(msg)
	if err != nil {
		log.Println(err)
		badbyte := []byte{'\n'}
		conn.Write(badbyte)
		return err
	}
	data = appendNewline(data)

	_, err = conn.Write(data)
	if err != nil {
		log.Println("Could not cancel request properly:", err)
		return err
	}
	return nil
}

func SendMessageToBroker(punchInMsg ToBrokerMessage, connectionType string, url string, port string) (FromBrokerMessage, error) {
	var msg FromBrokerMessage

	data, err := json.Marshal(punchInMsg)
	if err != nil {
		return msg, err
	}
	data = appendNewline(data)

	conn, err := net.Dial(connectionType, url + ":" + port)
	if err != nil {
		return msg, err
	}

	rw := bufio.NewReadWriter(
		bufio.NewReader(conn),
		bufio.NewWriter(conn),
	)

	_, err = rw.Write(data)
	if err != nil {
		return msg, err
	}

	err = rw.Writer.Flush()
	if err != nil {
		return msg, err
	}

	data, err = rw.ReadBytes('\n')
	if err != nil {
		return msg, err
	}

	err = json.Unmarshal(data, &msg)
	if err != nil {
		return msg, err
	}

	return msg, nil
}

func NewPunchInMessage(username string) ToBrokerMessage {
	punchInMsg := punchInMessage{
		username,
	}
	data, err := json.Marshal(punchInMsg)
	if err != nil {
		panic(err)
	}

	return ToBrokerMessage{
		punchIn,
		string(data),
	}
}

func NewPunchOutMessage(username string) ToBrokerMessage {
	punchOutMsg := punchOutMessage{
		username,
	}
	data, err := json.Marshal(punchOutMsg)
	if err != nil {
		panic(err)
	}

	return ToBrokerMessage{
		punchOut,
		string(data),
	}
}

func appendNewline(bytes []byte) []byte {
	return append(bytes, '\n')
}
