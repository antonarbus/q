#!/bin/sh
set -e

# Substitute environment variables in nginx config template
envsubst '${BACKEND_URL}' < /tmp/nginx.conf.template > /etc/nginx/nginx.conf

# Start nginx
exec nginx -g 'daemon off;'
