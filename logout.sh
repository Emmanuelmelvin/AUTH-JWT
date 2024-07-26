#!/bin/bash

# Send GET request to logout endpoint with cookies.txt
curl -X GET http://localhost:3000/logout -b cookies.txt

# Check if the request was successful
if [ $? -eq 0 ]; then
  # Delete the cookies.txt file
  rm -f cookies.txt
  echo "Logout successful and cookies.txt deleted."
else
  echo "Logout request failed. cookies.txt not deleted."
fi
