#!/bin/bash
#
# Bump minor version.
#
## Usage: bump.sh PROJECT_PATH [SEMANTIC]
## 
## PROJECT_PATH:  e.g. apps/any-color
## SEMANTIC:  (minor | patch | major)
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

SEMANTIC=${2:-minor}
version_field() {
  case $1 in
    minor) echo "\$3++" ;;
    patch) echo "\$2++;\$3=0" ;;
    major) echo "\$1++;\$2=0;\$3=0" ;;
    *) echo "\$3++" ;;
  esac
}
FIELD_OPERATION=$(version_field ${SEMANTIC})

NEXT_VERSION=$(echo ${VERSION} | awk -F. -v OFS=. "{${FIELD_OPERATION};print}")

sed -i '' "/\"version\":/s/\"[0-9.]*\"/\"${NEXT_VERSION}\"/" ${JSON_FILE}
git add ${JSON_FILE}

HUSKY_SKIP_HOOKS=1 git commit -m "chore($PROJECT_NAME): bump to ${NEXT_VERSION}"
