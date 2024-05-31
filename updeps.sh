#!/usr/bin/env bash

sync_pkg_version() {
  PROJECT_NAME=$1
  PROJECT_PKG_JSON_PATH=${2:-"packages/${PROJECT_NAME}/package.json"}

  if [ -f ${PROJECT_PKG_JSON_PATH} ]; then
    PROJECT_CURRENT_VERSION=$(git describe --match "${PROJECT_NAME}@*" --abbrev=0 HEAD | sed 's/.\+@//');

    if [ $? -eq 0 ]; then
      jq ".version = \"${PROJECT_CURRENT_VERSION}\"" ${PROJECT_PKG_JSON_PATH} > ${PROJECT_PKG_JSON_PATH}.tmp;
      mv ${PROJECT_PKG_JSON_PATH}.tmp ${PROJECT_PKG_JSON_PATH};
    fi

  fi 

}

sync_pkg_version core;
sync_pkg_version driver-nestjs;
sync_pkg_version compiler;
