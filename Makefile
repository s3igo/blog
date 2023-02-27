.PHONY: dev
dev:
ifeq ($(shell whoami),node)
	npm run dev -w app
else
	docker compose up
endif

.PHONY: init
init:
	# `npm ci`は毎回新しいnode_modulesを作成するので、この記述意味ないかも
	rm -rf ./node_modules
	rm -rf ./app/node_modules
ifeq ($(shell whoami),node)
	npm ci
	cd contents && zk index
else
	docker compose run --rm app npm ci
	docker compose run --rm root cd contents && zk index
	# TODO: rootコンテナで実行するの適切? textlint導入まで検討しない
endif

.PHONY: lint
lint:
ifeq ($(shell whoami),node)
	npm run eslint -w app
else
	docker compose run --rm app npm run eslint
endif

.PHONY: format
format:
ifeq ($(shell whoami),node)
	npm run prettier -w app
else
	docker compose run --rm app npm run prettier
endif

# --------------------------- 以下はDockerコンテナ外でのみ実行可能 -------------------------- #
.PHONY: shell
shell:
ifeq ($(shell whoami),node)
	@echo "You can't run this command in the container."
else
	docker compose run --rm --service-ports app bash
endif

.PHONY: down
down:
ifeq ($(shell whoami),node)
	@echo "You can't run this command in the container."
else
	docker compose down
endif

.PHONY: clean
clean:
ifeq ($(shell whoami),node)
	@echo "You can't run this command in the container."
else
	docker compose down --rmi all --volumes --remove-orphans
endif
