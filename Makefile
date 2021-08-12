SHELL := bash
.ONESHELL:
.SHELLFLAGS := -eu -o pipefail -c
.DELETE_ON_ERROR:
MAKEFLAGS += --warn-undefined-variables
MAKEFLAGS += --no-builtin-rules


first: help


build: npm-build

# ------------------------------------------------------------------------------
# Build


npm-build:  ## Build website
	npm run build
	npm run export


npm-i: npm-install
npm-install:  ## Install JS dependencies
	npm install


npm-dev:  ## Run dev server
	npm run dev


cleanjs:  ## Clean JS files
	rm -rf out
	rm -rf .next


cleanalljs: cleanjs  ## Clean JS files
	rm -rf node_modules
	rm -rf package-lock.json


# ------------------------------------------------------------------------------
# Other

cleanall:  ## Clean everything
	echo "clean"

help:  ## Show this help menu
	@grep -E '^[0-9a-zA-Z_-]+:.*?##.*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?##"; OFS="\t\t"}; {printf "\033[36m%-30s\033[0m %s\n", $$1, ($$2==""?"":$$2)}'
