#!/bin/bash
#
# Release the production zip file.
#
## Usage: release.sh PROJECT_PATH
## 
## PROJECT_PATH:  e.g. apps/any-color
## 

set -euo pipefail

usage() {
  [ "$*" ] && echo "$0: $*"
  sed -n '/^##/,/^$/s/^## \{0,1\}//p' "$0"
  exit 2
} 2>/dev/null

REPO_DIR="$(cd $(dirname $0)/..; pwd)"
PROJECT_PATH=$1
PROJECT_NAME=$(echo "${PROJECT_PATH}" | cut -d / -f 2)

MANIFEST_FILE="${REPO_DIR}/${PROJECT_PATH}/src/manifest.json"
PACKAGE_FILE="${REPO_DIR}/${PROJECT_PATH}/packages.json"
[ -f "${PACKAGE_FILE}" ] && JSON_FILE=${PACKAGE_FILE} || JSON_FILE=${MANIFEST_FILE}

VERSION_SH=${REPO_DIR}/tools/version.sh
VERSION=$(${VERSION_SH} ${JSON_FILE})

OUTPUT_DIR=${REPO_DIR}/dist/${PROJECT_PATH}
OUTPUT_ZIP=${REPO_DIR}/dist/${PROJECT_NAME}_${VERSION}.zip

yarn build ${PROJECT_NAME} --prod
cd ${OUTPUT_DIR}
zip -r ${OUTPUT_ZIP} *

printf "\nReleased ${OUTPUT_ZIP}\n"
