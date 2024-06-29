#!/usr/bin/env bash

PATH_WS_ROOT=../../../../..
source ${PATH_WS_ROOT}/scripts/smart-release.sh 

PATTERN=^packages/ast/integrations/npm/utils
HAS_CHANGES="$(has_changes_desired_since_last_tag ${PATTERN})"

if [[ "${HAS_CHANGES}" == "true" ]]; then
  release-it -c .release-it.json $@
fi
