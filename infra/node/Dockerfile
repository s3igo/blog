FROM golang:1.20-bullseye AS builder

RUN git clone https://github.com/mickael-menu/zk.git
RUN cd zk && make

FROM node:gallium-bullseye-slim

COPY --from=builder /go/zk/zk /usr/local/bin/zk
RUN apt update && apt install -y git make bat fzf
RUN ln -s /usr/bin/batcat /usr/local/bin/bat
