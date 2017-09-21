#!/bin/bash
declare -A PROCESSES
PROCESSES[schedule]='./schedule.sh'
PROCESSES[crawlhigh]='./crawl-high.sh'
PROCESSES[crawllow]='./crawl-low.sh'
PROCESSES[import]='./import.sh'
PROCESSES[gts]='./generate-trend-summary.sh'
PROCESSES[updatesummary]='./update-summary.sh'
for i in "${!PROCESSES[@]}"
do
    SERVICE="${PROCESSES[$i]}"
    if ps ax | grep -v grep | grep $SERVICE > /dev/null
    then
        pkill -f "$SERVICE"
    fi
done