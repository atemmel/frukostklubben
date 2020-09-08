package main

import (
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
			w.OpenDevTools()
			/*
			go func() {
			}()
			*/
			return nil
		},
		RestoreAssets: RestoreAssets,
		Windows: []*bootstrap.Window{{
			Homepage:       "index.html",
			MessageHandler: handleMessages,
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


	// w.OnMessage(func(m *astilectron.EventMessage) interface{} {
		
	// 	// Unmarshal
	// 	var s string
		
	// 	log.Printf("message: %s",s);
		
	// 	//m.Unmarshal(&s)
	
	// 	// // Process message
	// 	// if s == "hello" {
	// 	// 		return "world"
	// 	// }
	// 	return "hello from go!"
	// })
}
