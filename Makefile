USER := s3igo
REPO := blog

.PHONY: dev
dev:
	pnpm start

.PHONY: preview
preview:
	bash -c "trap 'pnpm run build:clean' SIGINT; pnpm run preview"

.PHONY: test
test:
	pnpm test

.PHONY: clean
clean:
	pnpm run clean
	pnpm run build:clean
	pnpm run coverage:clean

.PHONY: init
init:
	pnpm run clean
	pnpm install

.PHONY: clear-cache
clear-cache:
	gh api repos/$(USER)/$(REPO)/actions/caches \
		| jq '.actions_caches[].id' \
		| xargs -I{} gh api -X DELETE repos/$(USER)/$(REPO)/actions/caches/{}
