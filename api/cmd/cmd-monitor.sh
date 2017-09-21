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
        echo -e "\033[32m $SERVICE service running, everything is fine"
    else
        echo -e "\033[31m $SERVICE is not running"
        nohup /bin/bash $SERVICE > "nohup-$i.out" &
        echo -e "\033[32m $SERVICE will restart"
    fi
done
echo -e "\033[30m"