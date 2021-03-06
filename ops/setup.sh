#!/bin/bash

logfile=/var/log/ico.log
logrotate_conf=/etc/logrotate.d/ico
user=$(whoami)

sudo apt update
curl -sL https://deb.nodesource.com/setup_12.x -o /tmp/nodesource_setup.sh
sudo bash /tmp/nodesource_setup.sh
sudo apt install -y nodejs

sudo touch $logfile
sudo chown $user:$user $logfile

sudo cp ${HOME}/ico/ops/logrotate.conf $logrotate_conf
sudo chown $user:$user $logrotate_conf

npm i
