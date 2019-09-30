#!/bin/bash

repositories=(
  '@process-engine/correlation.contracts'
  '@process-engine/correlation.service'
  '@process-engine/correlations.repository.sequelize'
  '@process-engine/flow_node_instance.contracts'
  '@process-engine/flow_node_instance.service'
  '@process-engine/flow_node_instance.repository.sequelize'
  '@process-engine/cronjob_history.contracts'
  '@process-engine/cronjob_history.service'
  '@process-engine/cronjob_history.repository.sequelize'
  '@process-engine/process_model.contracts'
  '@process-engine/process_model.use_case'
  '@process-engine/process_model.service'
  '@process-engine/process_model.repository.sequelize'
  '@process-engine/logging_api_contracts'
  '@process-engine/logging_api_core'
  '@process-engine/logging_api_http'
  '@process-engine/metrics_api_contracts'
  '@process-engine/metrics_api_core'
  '@process-engine/process_engine_contracts'
  '@process-engine/process_engine_core'
  '@process-engine/iam'
  '@process-engine/consumer_api_contracts'
  '@process-engine/consumer_api_core'
  '@process-engine/consumer_api_http'
  '@process-engine/consumer_api_client'
  '@process-engine/management_api_contracts'
  '@process-engine/management_api_core'
  '@process-engine/management_api_http'
  '@process-engine/management_api_client'
  '@process-engine/process_engine_runtime'
  '@process-engine/process_engine_client'
)

tags=(
  'feature'
  'develop'
  'hotfix'
  'release'
  'rc'
  'revert'
  'betafix'
)

for repo in "${repositories[@]}"
do
  echo "------ Cleaning npm tags for repository: $repo ---------------"
  for tag in "${tags[@]}"
  do
    PACKAGE_NAME=$repo BRANCH_PREFIX=$tag node clean_npm_tags.js
  done
  echo "-------------------------- Done ------------------------------"
done
