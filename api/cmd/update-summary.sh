#!/bin/bash
scriptdir="$( cd ${0%/*} && pwd -P )"
apidir="$(dirname $scriptdir)"
(while : ; do sleep 10 ; $apidir/bin/cake UpdateSummary update 500 || break ; done)
