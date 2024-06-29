#!/usr/bin/env bash

pnpm run -r release:base $@

pnpm run -w w:release:base $@
