#!/usr/bin/env bash

npm cache clean
npm install -g grunt-cli@^1.2.0
npm update -g

npm install
npm update
npm prune