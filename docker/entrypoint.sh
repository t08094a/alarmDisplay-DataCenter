#!/bin/sh

echo "The application will start in ${START_SLEEP}s..." && sleep ${START_SLEEP}
exec node server.js
