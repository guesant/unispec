#!/usr/bin/env bash

function get_latest_branch_tag {
  LATEST_BRANCH_TAG="$(git describe --tags --abbrev=0)"
  echo "${LATEST_BRANCH_TAG}"
}

function get_latest_branch_tag_sha {
  LATEST_BRANCH_TAG="$(get_latest_branch_tag)"
  LATEST_BRANCH_TAG_SHA="$(git rev-list -n 1 ${LATEST_BRANCH_TAG})"
  echo "${LATEST_BRANCH_TAG_SHA}"
}

function get_changes_since_last_branch_tag {
  LATEST_BRANCH_TAG_SHA="$(get_latest_branch_tag_sha)"
  CHANGES="$(git diff --name-only HEAD ${LATEST_BRANCH_TAG_SHA} | cat )"
  echo "${CHANGES}"
}

function get_changes_desired_since_last_branch_tag {
  DESIRED="$1"
  CHANGES="$(get_changes_since_last_branch_tag)"
  #
  CHANGES_DESIRED=$(echo "${CHANGES}" | grep -E "${DESIRED}"; exit 0)
  echo "${CHANGES_DESIRED}"
}

function get_changes_desired_count_since_last_branch_tag {
  DESIRED=$1
  CHANGES_DESIRED=$(get_changes_desired_since_last_branch_tag "${DESIRED}")

  #

  CHANGES_DESIRED_COUNT=0

  if [[ -n "${CHANGES_DESIRED}" ]]; then
    CHANGES_DESIRED_COUNT=$( echo "${CHANGES_DESIRED}" | wc -l )
  fi

  echo "${CHANGES_DESIRED_COUNT}"

}

function has_changes_desired_since_last_tag {
  SMART_EXEC_DESIRED=$1
  CHANGES_DESIRED_COUNT=$(get_changes_desired_count_since_last_branch_tag ${SMART_EXEC_DESIRED})

  if [[ "${SMART_EXEC_FORCE}" == "true" || ${CHANGES_DESIRED_COUNT} -gt 0 ]]; then
    echo "true";
  else
    echo "false";
  fi
}

# function smart_exec {
#   SMART_EXEC_DESIRED=$1

#   if [[ "$(has_changes_desired_since_last_tag ${SMART_EXEC_DESIRED})" == "true" ]]; then
#     echo "yes"
#   else
#     echo "no"
#   fi
# }

# function do_run_release_base {
#   if [[ ! ${SMART_RELEASE_DRY_RUN} == "false" ]]; then
#     echo [do-run-release-base::dry] \# pnpm run -r release:base $0
#     echo [do-run-release-base::dry] \# pnpm run -w w:release:base $0
#   else
#     pnpm run -r release:base $0
#     pnpm run -w w:release:base $0
#   fi
# }

# function hello {
#   DESIRED="^$"
#   smart_exec ${DESIRED}
# }

# case $1 in

#   get_latest_branch_tag)
#     get_latest_branch_tag $2
#     ;;
#   get_latest_branch_tag_sha)
#     get_latest_branch_tag_sha $2
#     ;;
#   get_changes_since_last_branch_tag)
#     get_changes_since_last_branch_tag $2
#     ;;
#   get_changes_desired_since_last_branch_tag)
#     get_changes_desired_since_last_branch_tag $2
#     ;;
#   get_changes_desired_count_since_last_branch_tag)
#     get_changes_desired_count_since_last_branch_tag $2
#     ;;
#   has_changes_desired_since_last_tag)
#     has_changes_desired_since_last_tag $2
#     ;;
#   do_run_release_base)
#     do_run_release_base $2
#     ;;
#   smart_exec)
#     smart_exec $2
#     ;;
#   hello)
#     hello $2
#     ;;

#   *)
#     echo -n "unknown command"
#     ;;
# esac

