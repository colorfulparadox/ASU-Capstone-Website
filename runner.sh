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

if [ "$1" = "buildrun" ]; then
    cd hosting_server
    build_server
    cd ../webapp
    build_webapp

    cd ../hosting_server
    ./HostingServer
fi


if [ "$1" = "build" ]; then
    if [ -z "$2" ]; then
        echo "Error: You didn't specify 'server' or 'web', or 'all'."
        exit 1
    fi

    if [ "$2" = "server" ]; then
        cd hosting_server
        build_server
    elif [ "$2" = "web" ]; then
        cd webapp
        build_webapp
    elif [ "$2" = "all" ]; then
        cd hosting_server
        build_server
        cd ../webapp
        build_webapp
    else
        echo "Invalid option: '$2'. Please specify 'server' or 'web'."
        exit 1
    fi
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

