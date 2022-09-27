To run commands in this project go to root directory of this project in terminal.

This Cli only supports two main commands cost and time
All the flags should be passed and no extra arguments can be passed this will throw validation error.

The command format is like below commands

To calculate cost run:
```
node ./src/cli.js cost -p 100 -n 3 -ps 'PKG1 5 5 OFR001, PKG2 15 5 OFR002, PKG3 10 100 OFR003'

```

To calculate time run:
```
node ./src/cli.js time -p 100 -n 3 -ps 'PKG1 5 5 OFR001, PKG2 15 5 OFR002, PKG3 10 100 OFR003' -vi 2 70 200
```

to run test cases run 

```
npm run test 

```
If you are reading this then welcome to my project. Suggestion will be appreciated.
Thank you.