#!/bin/bash


function build_server() {
    if test -f HostingServer; then
        go clean
    fi
    go build .
}

function build_webapp() {
    if ! test -d build; then
        npm install
    fi
    npm run build
}


if [ "$1" = "build" ] && [ "$2" = "all" ]; then
    cd hosting_server
    build_server
    cd ../webapp
    build_webapp
fi


if [ "$1" = "build" ] && [ "$2" = "server" ]; then
    cd hosting_server
    build_server
fi


if [ "$1" = "build" ] && [ "$2" = "web" ]; then
    cd webapp
    build_webapp
fi


if [ "$1" = "run" ]; then
    cd hosting_server
    ./HostingServer
fi

if [ "$1" = "clean" ]; then
    cd hosting_server
    go clean
    cd ../webapp
    rm -r build
    rm -r node_modules
fi

