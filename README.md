# frukostklubben

### dependencies

- angular
- astilectron bundler
- go
- nodejs

To install the astilectron bundler, you can run the following commands:

```sh
# Download
go get -u github.com/asticode/go-astilectron-bundler/...
# Install
go get -u github.com/asticode/go-astilectron-bundler/...
```

### building

Before building any parts of the project it is assumed that all dependencies are installed and that the repository has been cloned.

##### building the broker

```sh
go build ./cmd/frukostklubben-broker
```

##### building the text interface version

```sh
go build ./cmd/frukostklubben-tui
```

##### building the electron application

```sh
cd cmd/frukostklubben/app-ui
npm install
ng build --prod
```

Copy the files in `cmd/frukostklubben/app-ui/dist/` to `cmd/frukostklubben/resources/app/`.

Run the bundler with `astilectron-bundler` (or `~/go/bin/astilectron-bundler` if your `$GOPATH` is not set up correctly)

Build scripts:

| Command     | Explanation                                                                |
| ----------- | -------------------------------------------------------------------------- |
| `build`     | Build the frontend application                                             |
| `w-build`   | Build the frontend application automatically when new changes are detected |
| `package`   | Run the electron bundler                                                   |
| `run:macos` | Run the packaged app for Mac OS                                            |
| `deploy`    | Run the electron bundler and then start the packaged app                   |
