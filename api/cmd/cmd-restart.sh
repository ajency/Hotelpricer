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
        echo "$SERVICE service running, everything is fine"
        pkill -f "$SERVICE"
        echo "$SERVICE stopped"
    else
        echo "$SERVICE is not running"
        #echo "$SERVICE is not running!" | mail -s "$SERVICE down" root
    fi
    nohup /bin/bash $SERVICE > "nohup-$i.out" &
done
for i in "${!PROCESSES[@]}"
do
    SERVICE="${PROCESSES[$i]}"

    if ps ax | grep -v grep | grep $SERVICE > /dev/null
    then
        echo -e "\033[32m $SERVICE restarted successfully"
    else
        echo -e "\033[31m $SERVICE could not be restarted"
    fi
done
echo -e "\033[30m"
