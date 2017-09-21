#!/bin/bash
scriptdir="$( cd ${0%/*} && pwd -P )"
apidir="$(dirname $scriptdir)"

echo "stated scheduler shell";
(while : ; do sleep 5 ; $apidir/bin/cake Schedule runScheduler 0 || break; done)
echo "ended scheduler shell";
