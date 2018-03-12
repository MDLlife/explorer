[![mdl logo](https://github.com/MDLlife/MDL/raw/testnet/mdl.png)](https://mdl.life)

# MDL Explorer

[![Build Status](https://travis-ci.org/MDLlife/explorer.svg)](https://travis-ci.org/MDLlife/explorer)

https://explorer.mdl.life

## Requirements

```
go>=1.8
node>=v6.9.0
npm>=3.10.10
```

### Go

The server is written in golang.

The golang server returns the static content from `dist/` and proxies a subset of the MDL node API.

### Angular

As an Angular CLI projects,  Node 6.9.0 or higher, together with NPM 3 are required.

After cloning the project, you will need to run `npm install` to pull in all javascript dependencies.

The angular code is compiled to the `dist/` folder.

## Usage

### Run MDL node

```sh
go get github.com/MDLlife/MDL
cd $GOPATH/src/github.com/MDLlife/MDL
./run.sh
```

### Run the explorer

```sh
make run
```

This must be run from the same directory that contains `dist/`.

The explorer assumes that the MDL node is running on `localhost:8320` by default.

To point it at a different address:

```sh
MDL_ADDR=http://127.0.0.1:3333 ./explorer
```

`explorer` can be run in api-only mode, which will expose the JSON API but not serve the static content from `dist/`:

```sh
make run-api
```

### Docker images

```
$ docker build -t MDLlife/explorer .
$ docker run -p 8001:8001 MDLlife/explorer
```

Access the explorer: [http://localhost:8001](http://localhost:8001).

The `MDL_ADDR` and the `EXPLORER_HOST` environment variables can be passed
to the running container to modify the default behavior.


## Development

After changing the angular frontend, it should be compiled and committed to the repo.
This is to simplify deployment of the application, and allow users to run it themselves without
installing node and npm then running `npm install` and `npm run build`.

### Compiling the angular frontend

```sh
make build-ng
```

### Formatting

`explorer.go` should be formatted with `goimports`. You can do this with:

```sh
make format
```

You must have goimports installed (use `make install-linters`).

### Code Linting

Install prerequisites:

```sh
make install-linters
```

Run linters:

```sh
make lint
```

## Deployment

Compile `explorer.go` to a binary:

```sh
make build-go
```

Allow it to bind to port 80 using `setcap`:

```sh
sudo setcap 'cap_net_bind_service=+ep' ./explorer
```

Run it on port 80:

```sh
EXPLORER_HOST=:80 ./explorer
```
