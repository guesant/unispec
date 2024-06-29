#!/usr/bin/env bash

pattern=^packages/ast/integrations/npm/builder

path_ws_root=../../../../..

source ${path_ws_root}/scripts/rebirth.sh 

has_changes="$(has_changes_desired_since_last_tag ${pattern})"

if [[ "${has_changes}" == "true" ]]; then
  echo \# release-it -c .release-it.json $@
fi
