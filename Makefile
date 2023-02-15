.PHONY: dev
dev:
ifeq ($(shell whoami),node)
	npm run dev -w frontend
else
	docker compose up
endif

.PHONY: init
init:
	rm -rf ./node_modules
	rm -rf ./frontend/node_modules
ifeq ($(shell whoami),node)
	npm ci
else
	docker compose run --rm frontend npm ci
endif

.PHONY: lint
lint:
ifeq ($(shell whoami),node)
	npm run eslint -w frontend
else
	docker compose run --rm frontend npm run eslint
endif

.PHONY: format
format:
ifeq ($(shell whoami),node)
	npm run prettier -w frontend
else
	docker compose run --rm frontend npm run prettier
endif

# --------------------------- 以下はDockerコンテナ外でのみ実行可能 -------------------------- #
.PHONY: shell
shell:
ifeq ($(shell whoami),node)
	@echo "You can't run this command in the container."
else
	docker compose run --rm --service-ports frontend bash
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
