# Contribution Guidelines

Guidelines and templates for contribution

## Templates

We use the following GitHub templates:

- [Issue Template](./github/ISSUE_TEMPLATE.md)
- [Pull Request Template](./github/PULL_REQUEST_TEMPLATE.md)

The versions stored in this repository should be considered canon.

If you spot an outdated version in any of our repositories, you are very welcome
to update them!

## Organisation

`ProcessEngine` consists of a great number of GitHub repositories.

These repositories are not exclusively contained in the `@process-engine`
organisation, but also in `@essential-projects`.

The main difference between these organisations is:

- `@process-engine` contains all *professional* modules that make up
`ProcessEngine` and `BPMN-Studio`.
- `@essential-projects` contains all *technical* modules,
which the `ProcessEngine` requires for its basic functionality
(i.e. bootstrapping, HttpServer, Socket.IO handling, etc.).

## Setup & Repository Management

We provide scripts to automatically setup and update `ProcessEngine` and
`BPMN-Studio`.

You can find these scripts and a manual on how to use them [here](./scripts/setup).
