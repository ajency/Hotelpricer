#!/bin/sh
#wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.32.1/install.sh | bash
#nvm install 6.5.0
#nvm use 6.5.0
rm -rf platforms
rm -rf www
npm install
npm install ng2-charts --save
npm install chart.js --save
ionic cordova platform add --save browser
ionic cordova build browser --prod
