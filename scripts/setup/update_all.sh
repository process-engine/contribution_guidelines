#!/bin/bash
meta exec "git pull && git fetch -p --all" --exclude process-engine

repositories=(
  'essential_projects_meta'
  'management_api_meta'
  'consumer_api_meta'
  'deployment_api_meta'
  'metrics_api_meta'
  'logging_api_meta'
  'kpi_api_meta'
  'token_history_api_meta'
  'external_task_api_meta'
  'process_engine_meta'
  'persistence_api_meta'
  'bpmn-studio_meta'
  )

for repo in "${repositories[@]}"
do
  cd $repo
  echo "------------------------------------------------"
  echo $repo
  echo "------------------------------------------------"
  meta exec "git pull && git fetch -p --all"
  cd ..
done
