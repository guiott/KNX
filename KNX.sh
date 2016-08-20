#!/bin/bash
cd /var/KNX
nohup node app.js >/var/KNX/KNX.log 2>&1 &