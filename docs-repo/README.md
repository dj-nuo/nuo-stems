# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Installation

```bash
bun install
```

## Local Development

```bash
bun start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```bash
bun build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

Uses GitHub Actions to deploy to FTP. (see `.github/workflows/deploy-docs.yml`)
