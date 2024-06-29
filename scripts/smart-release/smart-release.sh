#!/usr/bin/env bash

#

DESIRED="^$"

CHANGES_DESIRED_COUNT=$(./get-changes-desired-count-since-last-branch-tag.sh ${DESIRED})

#

echo "[smart-release] Affected files count: ${CHANGES_DESIRED_COUNT}"

if [[ "${SMART_RELEASE_FORCE}" == "true" || ${CHANGES_DESIRED_COUNT} -gt 0 ]]; then
  echo "[smart-release] Changed since last release"
  ./do-run-release-base.sh $@
else
  echo "[smart-release] No changes since last release"
fi

#
