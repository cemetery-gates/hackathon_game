# AsterRoyale
A multiplayer asteroids game where players use cell phones to each control their own ship

## How To Use
```bash
# Clone this repository
$ git clone --depth 1 git@github.adtran.com:Hackathon/AsterRoyale.git asterroyale

# Go into the repository
$ cd asterroyale

# Install dependencies
$ npm install

# Install dependencies in the various projects
$ npm run init

# Start the local development server (on http://127.0.0.1:8080)
# server is also at http://127.0.0.1:3000
# client is also at http://127.0.0.1:4200
# view is also at http://127.0.0.1:4300
$ npm run up

# To view a running docker:
$ npm run up:<name>
# (e.g., to see the server: npm run up:server)

# To start elements once they've started:
$ npm run start

# To stop elements once they've started:
$ npm run start

# To clean up the docker files from your system:
$ npm run down
