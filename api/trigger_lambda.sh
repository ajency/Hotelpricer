#!/bin/bash
set -e
APPLICATION_PATH=/var/www/repricingZappa/repricing
cd "${APPLICATION_PATH}"
source ../bin/activate
aws lambda invoke --function-name repricing-production  --region us-east-1 output.txt