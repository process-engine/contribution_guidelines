# Setup

## Prerequisites

The following is required to run the setup:
- A UNIX Shell (You can use `git bash` on windows)
- A working `npm` installation that contains the `meta` tool.
    - Install meta globally with `npm install -g meta`

This guide assumes that you have a basic understanding on how meta works.

If you do not know about meta, it is recommended that you read [this](https://www.npmjs.com/package/meta) first.

## Contents

This setup consist of three files:
 - `.meta` - Contains a list of all the meta setups we currently use (see below).
 - `initial_setup.sh` - Performs the initial `git clone` for every repository
in every meta setup.
 - `update_all.sh` - Performs a `git pull` and `git fetch` for every repository
in every meta setup, allowing you to update the entire ProcessEngine
with a single command.

## The meta setups

We use a number of so-called `meta setups` to group our github repositories.

Each of these setups is a github repository and contains a `.meta` file
that lists all the repositories it requires.

For example:
The [`consumer_api_meta`](https://github.com/process-engine/consumer_api_meta) repository has a [.meta](https://github.com/process-engine/consumer_api_meta/blob/develop/.meta) file,
which lists all the github repositories that make up the Consumer API.

We currently employ the following meta setups:
 - `bpmn-studio_meta`
 - `consumer_api_meta`
 - `deployment_api_meta`
 - `essential_projects_meta`
 - `external_task_api_meta`
 - `kpi_api_meta`
 - `logging_api_meta`
 - `management_api_meta`
 - `metrics_api_meta`
 - `persistence_api_meta`
 - `process_engine_meta`
 - `token_history_api_meta`

In addition, the setup's `.meta` file contains the following separate repositories:
 - `documentation`
 - `identity_server`
 - `process_engine_runtime`

## How to use the scripts

### Initial Setup

1. Download all three setup files
    - **NOTE**: All files **must** be stored at the same location!
2. Run `./initial_setup.sh`
    - All meta setups will now be cloned locally
    - After that, all repositories are cloned into the individual meta setups

Given the great number of repositories we use, this can take a few minutes.

Go get a coffee or something.

After this script has finished, you are good to go!

### Installing the meta setups

All the meta setups contain an npm script named `reinstall`, which performs
the following:
- Clear out all existing `node_modules`
- Clear the npm cache
- Run `npm install` and `npm build` for every Typescript package
- For the Consumer API: Run `dotnet restore` and `dotnet build` for every .NET package

So to install any of the meta setups, you only need to run `npm run reinstall`
from within the corresponding `*_meta` folder.

**NOTE**:
The `process_engine_runtime` also contains a `reinstall` script that you can
execute with `npm run reinstall`.

### Update the setup

To update your local setup, simply run `./update_all.sh`.

The script will perform the `git pull && git fetch -p --all` command over every
repository in every meta setup.

Time for another coffee.
