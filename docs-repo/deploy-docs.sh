#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# FTP server details
DOCS_FTP_HOST=$1
DOCS_FTP_USERNAME=$2
DOCS_FTP_PASSWORD=$3
LOCAL_DIR=$4
DOCS_FTP_DIR=$5

# Use lftp to mirror the local directory to the remote directory, skipping SSL verification
# set ssl:verify-certificate no;
lftp -d -c "
open -u $DOCS_FTP_USERNAME,$DOCS_FTP_PASSWORD $DOCS_FTP_HOST;
mirror -R --verbose --only-newer --parallel=10 $LOCAL_DIR $DOCS_FTP_DIR;
bye;
"