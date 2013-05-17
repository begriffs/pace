## Get realtime feedback from a crowd

### Try a [demo](http://like.begriffs.com)

This app aggregates a crowd's whim and shows a realtime guage.

Ways to use it
* A meeting bullshit meter
* Feedback for your public speaking
* Rating karaoke
* Gong show

### Deploy your own groupthink server

Clone this repo, go into its directory and run:

    npm install
    bower install
    grunt precompile
    npm install jitsu -g
    jitsu signup
    jitsu login
    jitsu apps create your-app
    jitsu deploy

### or run it locally

    npm install
    bower install
    grunt precompile

    node server.js

