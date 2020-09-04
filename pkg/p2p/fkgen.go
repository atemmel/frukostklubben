package p2p

import(
	"math/rand"
)

type Frukost struct {
	Name string
}

var FrukostOptions []Frukost = []Frukost{
	{ "Divan" },
	{ "KC" },
	{ "PC" },
	{ "Curres" },
	{ "Ecosub" },
	{ "Great Eastern" },
	{ "Biteline City" },
	{ "Biteline West" },
	{ "Donken" },
	{ "Donkadonken" },
	{ "Max" },
}

var BowserOptions []Frukost = []Frukost{
	{ "Luft & Ellära" },
	{ "Cola enbart" },
	{ "Kaffe-Daim-diet" },
}

func RandFrukost() Frukost {
	return FrukostOptions[rand.Intn(len(FrukostOptions)) - 1]
}
