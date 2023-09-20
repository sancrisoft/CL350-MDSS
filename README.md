# Getting started
1 - Clone repository.

 C:\Data\workspace>git clone https://github.com/BATraining/CL350-MDSS.git
 
 C:\Data\workspace>cd CL350-MDSS
 
 C:\Data\workspace\CL350-MDSS>git branch SPRINT2_X
 
2 - run: npm install

3 - run: grunt copy		// to update node_modules, css, data and graphics.

4 - run: grunt concat // to update js files.

5 - run: /builds/desktop/nw

# GIT commands

usual workflow

C:\Data\workspace>git clone https://github.com/BATraining/CL350-MDSS.git

C:\Data\workspace>cd CL350-MDSS

C:\Data\workspace\CL350-MDSS>git branch SPRINT2_X

C:\Data\workspace\CL350-MDSS>git checkout SPRINT2_X

C:\Data\workspace\CL350-MDSS>git add -A

C:\Data\workspace\CL350-MDSS>git commit -m "the message"

C:\Data\workspace\CL350-MDSS>git push origin SPRINT2_X


to create a new branch

C:\Data\workspace\CL350-MDSS>git branch SPRINT2_YYY

C:\Data\workspace\CL350-MDSS>git checkout SPRINT2_YYY


# Appendix 1 – building SQLite3 binaries

In order to rebuild the SQLITE3 binaries for Node Web-Kit 0.22.1 working in a 64bit environment the following two commands are required from the CMD window:  (issue with BBD firewall - use wireless dongle)

•	"npm install sqlite3 --save"

•	"npm install sqlite3 --build-from-source --runtime=node -webkit --target_arch=x64 --target=0.22.1"

npm install sqlite3 --build-from-source --runtime=node-webkit --target_arch=x64 --target="0.24.0"

Make sure the Python path is accessible from the directory where you want to build, confirm with "python --version" within the directory.

Useful link: https://github.com/mapbox/node-sqlite3/wiki/Building-on-Windows

# Appendix 2 - How to package and distribute your apps

https://github.com/nwjs/nw.js/wiki/How-to-package-and-distribute-your-apps#windows

https://github.com/nwjs/nw.js/wiki/How-to-package-and-distribute-your-apps#windows-1

Issue with BBD firewall, make sure to use wireless dongle to run "grunt nwjs --verbose"
