#!/bin/bash

# Define the URL and data
URL="http://localhost:3000/login"
DATA='{"email":"chidiuzoma65@gmail.com","password":"password123"}'
COOKIES_FILE="cookies.txt"

# Check if cookies.txt file exists
if [ -f "$COOKIES_FILE" ]; then
    # Use -b option if cookies.txt exists
    curl -X POST "$URL" -H "Content-Type: application/json" -d "$DATA" -b "$COOKIES_FILE"
else
    # Use -c option if cookies.txt does not exist
    curl -X POST "$URL" -H "Content-Type: application/json" -d "$DATA" -c "$COOKIES_FILE"
fi
