package main

import (
	// "encoding/json"


	astilectron "github.com/asticode/go-astilectron"
	astikit "github.com/asticode/go-astikit"
	bootstrap "github.com/asticode/go-astilectron-bootstrap"

	"fmt"
	"log"
)

const(
	appName = "FrukostKlubben"
	iconPngPath = "resources/icon.png"
	iconIcnsPath = "resources/icon.icns" // .icns
	debug = false
)

// Vars injected via ldflags by bundler
var (
	AppName            string
	BuiltAt            string
	VersionAstilectron string
	VersionElectron    string
)

var(
	w *astilectron.Window
)

type User struct {
	Name string `json:"name"`
}

type Message struct {
	Message string `json:"message"`
	Author User `json:"author"`
	Timestamp string `json:"timestamp"`
  }

func main() {
	// Create logger
	logger := log.New(log.Writer(), log.Prefix(), log.Flags())

	// Run bootstrap
	log.Printf("Running app built at %s\n", BuiltAt)
	if err := bootstrap.Run(bootstrap.Options{
		Asset:    Asset,
		AssetDir: AssetDir,
		AstilectronOptions: astilectron.Options{
			AppName:            AppName,
			AppIconDarwinPath:  iconIcnsPath ,
			AppIconDefaultPath: iconPngPath,
			SingleInstance:     true,
			VersionAstilectron: VersionAstilectron,
			VersionElectron:    VersionElectron,
		},
		Debug:  debug,
		Logger: logger,
		MenuOptions: nil,
		OnWait: func(_ *astilectron.Astilectron, ws []*astilectron.Window, _ *astilectron.Menu, _ *astilectron.Tray, _ *astilectron.Menu) error {
			w = ws[0]

			w.OnMessage(func(m *astilectron.EventMessage) interface{} {

				var message Message

				m.Unmarshal(&message)

				//log.Println(message.Author.Name + " says: " + message.Message)

				w.SendMessage(message, func(m *astilectron.EventMessage) {
					// Unmarshal
					var s string
					m.Unmarshal(&s)
			
					// Process message
					log.Printf("received %s\n", s)
				})

				return "hej"
			})


			// jsonMessage, err := json.Marshal(message)

			// if err != nil {log.Println(err)}

			
			// w.OpenDevTools()
			/*
			go func() {
			}()
			*/
			return nil
		},
		RestoreAssets: RestoreAssets,
		Windows: []*bootstrap.Window{{
			Homepage:       "index.html",
			// MessageHandler: handleMessages,
			Options: &astilectron.WindowOptions{
				//BackgroundColor: astikit.StrPtr("#333"),
				Center:          astikit.BoolPtr(true),
				Height:          astikit.IntPtr(700),
				Width:           astikit.IntPtr(700),
			},
		}},
	}); err != nil {
		log.Fatal(fmt.Errorf("running bootstrap failed: %w", err))
	}


	
}

// func main() {
// // Set logger
// l := log.New(log.Writer(), log.Prefix(), log.Flags())

// // Create astilectron
// a, err := astilectron.New(l, astilectron.Options{
// 	AppName:           "Test",
// 	BaseDirectoryPath: "example",
// })
// if err != nil {
// 	l.Fatal(fmt.Errorf("main: creating astilectron failed: %w", err))
// }
// defer a.Close()

// // Handle signals
// a.HandleSignals()

// // Start
// if err = a.Start(); err != nil {
// 	l.Fatal(fmt.Errorf("main: starting astilectron failed: %w", err))
// }

// // New window
// var w *astilectron.Window
// if w, err = a.NewWindow("index.html", &astilectron.WindowOptions{
// 	Center: astikit.BoolPtr(true),
// 	Height: astikit.IntPtr(700),
// 	Width:  astikit.IntPtr(700),
// }); err != nil {
// 	l.Fatal(fmt.Errorf("main: new window failed: %w", err))
// }

// // Create windows
// if err = w.Create(); err != nil {
// 	l.Fatal(fmt.Errorf("main: creating window failed: %w", err))
// }

// // Blocking pattern
// a.Wait()

// w.OnMessage(func(m *astilectron.EventMessage) interface{} {
		
// 	// 		// Unmarshal
// 	// 		// var s string
			
// 			// log.Printf("message: %s",s);
			
// 			// var message string
	
// 			log.Println("!!!!!")
	
// 			log.Println(m)
	
// 			// json.Unmarshal(m, &message)
	
// 			// log.Println(message)
	
// 			//m.Unmarshal(&s)
		
// 			// // Process message
// 			// if s == "hello" {
// 			// 		return "world"
// 			// }
// 			return "hej"
// 		})
// }
