#!/bin/bash

repositories=(
  '@process-engine/persistence_api.contracts'
  '@process-engine/persistence_api.use_cases'
  '@process-engine/persistence_api.services'
  '@process-engine/persistence_api.repositories.sequelize'
  '@process-engine/logging_api_contracts'
  '@process-engine/logging_api_core'
  '@process-engine/logging.repository.file_system'
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
  '@process-engine/solutionexplorer.contracts'
  '@process-engine/solutionexplorer.repository.contracts'
  '@process-engine/solutionexplorer.repository.filesystem'
  '@process-engine/solutionexplorer.repository.management_api'
  '@process-engine/solutionexplorer.service'
  '@process-engine/solutionexplorer.service.contracts'
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
