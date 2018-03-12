# skycoin build
# reference https://github.com/skycoin/skycoin
FROM golang:1.9 AS build

# dirs
RUN mkdir -p $GOPATH/src/github.com/skycoin/

# copy code to build
ADD . $GOPATH/src/github.com/skycoin/skycoin-explorer

# install skycoin-explorer
RUN cd $GOPATH/src/github.com/skycoin/skycoin-explorer && \
  CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o /go/bin/skycoin-explorer .

# skycoin image
FROM alpine:3.7

# copy all the binaries
COPY --from=build /go/bin/* /usr/bin/

# copy assets
COPY --from=build /go/src/github.com/skycoin/skycoin-explorer/dist ./dist

ENV EXPLORER_HOST="0.0.0.0:8001" \ 
    SKYCOIN_ADDRESS="http://127.0.0.1:6420"

EXPOSE 8001

CMD ["/usr/bin/skycoin-explorer"]
