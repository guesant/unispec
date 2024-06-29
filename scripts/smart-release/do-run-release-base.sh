#!/usr/bin/env bash

#

if [[ ! ${SMART_RELEASE_DRY_RUN} == "false" ]]; then
  echo [do-run-release-base::dry] \# pnpm run -r release:base $0
  echo [do-run-release-base::dry] \# pnpm run -w w:release:base $0
else
  pnpm run -r release:base $0
  pnpm run -w w:release:base $0
fi