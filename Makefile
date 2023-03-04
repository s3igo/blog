# docker compose
COMPOSE := docker compose
RUN_APP := $(COMPOSE) run --rm app
SELF = $(RUN_APP) make $@

# error message
ERROR := @echo "You can't run this command in the container." && exit 1

.PHONY: dev
dev:
ifeq ($(shell whoami),node)
	npm -w app start
else
	$(COMPOSE) up
endif

.PHONY: index
index:
ifeq ($(shell whoami),node)
	npm -w app run index
else
	$(SELF)
endif

.PHONY: init
init:
ifeq ($(shell whoami),node)
	npm ci
	make index
else
	$(SELF)
endif

.PHONY: lint
lint:
ifeq ($(shell whoami),node)
	npm -w app run lint
else
	$(SELF)
endif

.PHONY: format
format:
ifeq ($(shell whoami),node)
	npm -w app run
else
	$(SELF)
endif

# --------------------------- 以下はDockerコンテナ外でのみ実行可能 -------------------------- #
.PHONY: shell
shell:
ifeq ($(shell whoami),node)
	$(ERROR)
else
	$(COMPOSE) run --rm --service-ports app bash
endif

.PHONY: down
down:
ifeq ($(shell whoami),node)
	$(ERROR)
else
	$(COMPOSE) down
endif

.PHONY: clean
clean:
ifeq ($(shell whoami),node)
	$(ERROR)
else
	$(COMPOSE) down --rmi all --volumes --remove-orphans
endif
