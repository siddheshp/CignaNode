#!/bin/sh

# This script runs when the container starts
# It replaces placeholder variables in config.js with actual environment values

echo "Injecting environment variables into config.js..."

# Replace environment variable placeholders with actual values
envsubst < /usr/share/nginx/html/config.js > /usr/share/nginx/html/config.js.tmp
mv /usr/share/nginx/html/config.js.tmp /usr/share/nginx/html/config.js

echo "Configuration updated. Starting Nginx..."

# Start nginx web server
exec nginx -g 'daemon off;'
