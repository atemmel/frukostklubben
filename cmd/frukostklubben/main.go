package main

import (
	 "encoding/json"

	astikit "github.com/asticode/go-astikit"
	astilectron "github.com/asticode/go-astilectron"
	bootstrap "github.com/asticode/go-astilectron-bootstrap"

	"fmt"
	"log"
)

const (
	appName      = "FrukostKlubben"
	iconPngPath  = "resources/icon.png"
	iconIcnsPath = "resources/icon.icns" // .icns
	debug        = false
)

// Vars injected via ldflags by bundler
var (
	AppName            string
	BuiltAt            string
	VersionAstilectron string
	VersionElectron    string
)

var (
	w *astilectron.Window
)

type User struct {
	Name string `json:"Name"`
}

type Message struct {
	Type int `json:"type"`
	Payload string `json:"payload"`
}

type ChatMessage struct {
	Author    User   `json:"author"`
	Message   string `json:"message"`
	Timestamp string `json:"timestamp"`
}

type ReadyMessage struct {
	ChatReady bool `json:"chatReady"`
}

func main() {
	// Create logger
	logger := log.New(log.Writer(), log.Prefix(), log.Flags())

	// Run bootstrap
	log.Printf("Running app built at %s\n", BuiltAt)

	var startHeight = astikit.IntPtr(450)
	var startWidth = astikit.IntPtr(600)

	if err := bootstrap.Run(bootstrap.Options{
		Asset:    Asset,
		AssetDir: AssetDir,
		AstilectronOptions: astilectron.Options{
			AppName:            AppName,
			AppIconDarwinPath:  iconIcnsPath,
			AppIconDefaultPath: iconPngPath,
			SingleInstance:     true,
			VersionAstilectron: VersionAstilectron,
			VersionElectron:    VersionElectron,
		},
		Debug:       debug,
		Logger:      logger,
		MenuOptions: nil,
		OnWait: func(_ *astilectron.Astilectron, ws []*astilectron.Window, _ *astilectron.Menu, _ *astilectron.Tray, _ *astilectron.Menu) error {
			w = ws[0]



			w.OnMessage(func(m *astilectron.EventMessage) interface{} {


				var msg Message
				err := m.Unmarshal(&msg)
				if err != nil {
					fmt.Println(err)
					return nil
				}
				fmt.Println(msg);

				switch msg.Type {
					case 0:
						fmt.Println("ChatMessage")
						chatmsg := ChatMessage{}
						json.Unmarshal([]byte(msg.Payload), &chatmsg)
						fmt.Println(chatmsg.Message)
				
					case 1:
						fmt.Println("ReadyMessage")
						readymsg := ReadyMessage{}
						json.Unmarshal([]byte(msg.Payload), &readymsg)
						fmt.Println(readymsg)
						w.Resize(850,650);
						w.Center();

					default:
						fmt.Println("Unrecognized message :(")
				}

				w.SendMessage(msg);

				return nil
			})

			// w.OpenDevTools()
			/*
				go func() {
				}()
			*/
			return nil
		},
		RestoreAssets: RestoreAssets,
		Windows: []*bootstrap.Window{{
			Homepage: "index.html",
			// MessageHandler: handleMessages,
			Options: &astilectron.WindowOptions{
				//BackgroundColor: astikit.StrPtr("#333"),
				Center:    astikit.BoolPtr(true),
				Height:    startHeight,
				Width:     startWidth,
				Resizable: astikit.BoolPtr(false),
			},
		}},
	}); err != nil {
		log.Fatal(fmt.Errorf("running bootstrap failed: %w", err))
	}
}

