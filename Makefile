.PHONY: init
init:
ifeq ($(shell whoami), node)
	npm ci
else
	docker compose run --rm frontend npm ci
endif

.PHONY: dev
dev:
ifeq ($(shell whoami), node)
	npm run dev -w frontend
else
	docker compose up frontend
endif

# --------------------------- 以下はDockerコンテナ外でのみ実行可能 -------------------------- #
.PHONY: shell
shell:
ifeq ($(shell whoami), node)
	@echo "You can't run this command in the container."
else
	docker compose run --rm --service-ports frontend bash
endif

.PHONY: clean
clean:
ifeq ($(shell whoami), node)
	@echo "You can't run this command in the container."
else
	docker compose down --rmi all --volumes --remove-orphans
endif
