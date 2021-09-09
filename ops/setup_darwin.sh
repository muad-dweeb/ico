#!/bin/bash

logfile=/var/log/ico.log
logrotate_conf=/etc/logrotate.d/ico
user=$(whoami)

brew install node

sudo touch $logfile
sudo chown $user:$user $logfile

npm i