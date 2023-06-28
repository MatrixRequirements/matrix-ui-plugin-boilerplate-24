#!/usr/bin/env bash
cd dev-proxy || exit 
echo Running the development proxy, this will open Chrome 
echo and connect to your Matrix instance https://$INSTANCE.matrixreq.com
echo It will server your local plugin $SCRIPT_PATH
npx ts-node-esm index.ts $INSTANCE $SCRIPT_PATH chrome
