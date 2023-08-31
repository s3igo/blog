USER := s3igo
REPO := blog

.PHONY: dev
dev:
	npm start

.PHONY: preview
preview:
	bash -c "trap 'npm run build:clean' SIGINT; npm run preview:local"

.PHONY: test
test:
	npm test

.PHONY: clean
clean:
	npm run clean
	npm run build:clean
	npm run coverage:clean

.PHONY: init
init:
	npm run clean
	npm install

.PHONY: clear-cache
clear-cache:
	gh api repos/$(USER)/$(REPO)/actions/caches \
		| jq '.actions_caches[].id' \
		| xargs -I{} gh api -X DELETE repos/$(USER)/$(REPO)/actions/caches/{}
