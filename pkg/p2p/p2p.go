package p2p

const(
	PeerPort = "7331"
	PeerConnectionType = "tcp"
	BrokerPort = "7332"
	BrokerConnectionType = "tcp"
)

type Message struct {
	contents string
}
