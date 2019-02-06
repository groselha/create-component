# Groselha create-component

[![npm version](https://badge.fury.io/js/%40groselha%2Fcreate-component.svg)](https://badge.fury.io/js/%40groselha%2Fcreate-component)

## Install
```bash
$ npm add @groselha/create-component -D
```

## Usage

Create a component and follow the prompts
```bash
create-component <Component Name>
```

## Set your defauls

```bash
touch .componentrc
```

then add 

```json
{
  "path": "src/components",
  "folderCase": "pascalCase",
  "fileCase": "pascalCase",
  "test": {
    "skip": true,
    "defaults": true
  },
  "enzyme": {
    "skip": true,
    "defaults": false
  },
  "css": {
    "skip": true,
    "defaults": false
  },
  "storybook": {
    "skip": true,
    "defaults": false
  },
  "readme": {
    "skip": true,
    "defaults": false
  },
  "package": {
    "defaults": false,
    "skip": true
  }
}
```