#!/bin/bash
meta exec "git pull && git fetch -p --all" --exclude process-engine

repositories=(
  'management_api_meta'
  'consumer_api_meta'
  'process_engine_core_meta'
  'runtime_layer_meta'
  'essential_projects_meta'
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
