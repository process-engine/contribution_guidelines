# contribution_guidelines

Guidelines and templates for contribution

## Templates

We use the following templates in all our packages:
- [Issue Template](./gitub/ISSUE_TEMPLATE.md)
- [Pull Request Template](./gitub/PULL_REQUEST_TEMPLATE.md)

The versions stored in this repository should be considered as canon.

## Organisation

The ProcessEngine consists of a great number of github repositories.

These Repositories are not exclusively contained in the `@process-engine`
Organisation, but also in `@essential-projects`.

The main difference between these organisations is:
- `@essential-projects` contains all *technical* modules,
which the ProcessEngine requires for its basic functionalities
(i.e. bootstrapping, HttpServer, Socket.IO handling, etc.).
- `@process-engine` contains all the modules that are directly a part of the
ProcessEngine and BPMN Studio. This includes the Studio itself, the core packages
and all the APIs from every domain.

## Setup & Repository Management

We provide scripts to automatically setup and update the ProcessEngine
and BPMN Studio.

You can find these scripts and a manual on how to use them [here](./scripts/setup).
