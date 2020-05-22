#!/bin/bash

sudo apt update
curl -sL https://deb.nodesource.com/setup_12.x -o /tmp/nodesource_setup.sh
sudo bash /tmp/nodesource_setup.sh
sudo apt install -y nodejs

npm i
