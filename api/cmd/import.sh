#!/bin/bash
scriptdir="$( cd ${0%/*} && pwd -P )"
apidir="$(dirname $scriptdir)"

echo "stated import shell";
(while : ; do sleep 5 ; $apidir/bin/cake Import import 0 0 2 || break ; done);
echo "ended import shell"
