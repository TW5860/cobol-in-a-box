#!/usr/bin/env bash

if [ "$1" == "commit" ]; then
    touch /tmp/tw_pair
    PAIR=$(cat /tmp/tw_pair)

    read -p "Commit Message: " -e MSG
    read -p "Pair (Name <email@address.com>): " -i "${PAIR}" -e PAIR

    echo "${PAIR}" > /tmp/tw_pair

    git commit -m "${MSG}" -m "Co-authored-by: ${PAIR}"
else
    echo "Usage: ./go <command>"
    echo "  ./go commit        do a commit with pairing info"
fi