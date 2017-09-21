#!/bin/bash
scriptdir="$( cd ${0%/*} && pwd -P )"
apidir="$(dirname $scriptdir)"

(while : ; do sleep 30 ; $apidir/bin/cake GenerateTrendSummary generate 100 || break ; done)
