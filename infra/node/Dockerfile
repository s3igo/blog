FROM golang:1.20-bullseye AS builder

RUN git clone https://github.com/mickael-menu/zk.git
RUN cd zk && make

FROM node:gallium-bullseye-slim

RUN useradd -m develop && echo "develop:develop" | chpasswd && gpasswd -a develop sudo
COPY --from=builder /go/zk/zk /usr/local/bin/zk
RUN apt update && apt install -y git make bat fzf sudo
RUN ln -s /usr/bin/batcat /usr/local/bin/bat
