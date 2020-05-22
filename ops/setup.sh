#!/bin/bash

logfile=/var/log/ico.log

sudo apt update
curl -sL https://deb.nodesource.com/setup_12.x -o /tmp/nodesource_setup.sh
sudo bash /tmp/nodesource_setup.sh
sudo apt install -y nodejs

sudo touch $logfile
sudo chown ubuntu:ubuntu $logfile

npm i
