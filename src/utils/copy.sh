#!/bin/sh
cd /Users/di/WebstormProjects/untitled/node-blog/logs
cp access.log $(date +%Y-%m-%d).access.log
echo "" > access.log