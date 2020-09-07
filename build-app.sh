#!/usr/bin/sh
ORIGIN=$(pwd)
cd ./cmd/frukostklubben/app-ui
ng build --prod --base-href "."
cd ..
rm resources/app/*
cp -r app-ui/dist/app-ui/* resources/app/
astilectron-bundler || ~/go/bin/astilectron-bundler || printf "Please install astilectron-bundler\n"
cd "$ORIGIN"
