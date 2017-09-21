#!/bin/bash
scriptdir="$( cd ${0%/*} && pwd -P )"
apidir="$(dirname $scriptdir)"

echo "stated crawl-low shell";
(while : ; do sleep 10 ; $apidir/bin/cake crawler crawl 0 0 500 || break ; done)
echo "ended crawl-low shell";
