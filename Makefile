# docker compose
COMPOSE := docker compose
SELF = $(COMPOSE) run --rm app make $@

# npm
RUN := npm run
RUN_APP := $(RUN) -w app

# error
ERROR = $(error You can't run this command in the container)


.PHONY: dev
dev:
ifeq ($(shell whoami),node)
	$(RUN_APP) start
else
	$(COMPOSE) up
endif

.PHONY: preview
preview:
ifeq ($(shell whoami),node)
	bash -c "trap '$(RUN_APP) build:clean' SIGINT; $(RUN_APP) preview:local"
else
	$(COMPOSE) run --rm --service-ports app make $@
endif

.PHONY: test
test:
ifeq ($(shell whoami),node)
	$(RUN_APP) test
else
	$(SELF)
endif

.PHONY: index
index:
ifeq ($(shell whoami),node)
	$(RUN_APP) index
else
	$(SELF)
endif

.PHONY: clean
clean:
ifeq ($(shell whoami),node)
	$(RUN) clean
	$(RUN_APP) clean
	$(RUN_APP) build:clean
	$(RUN_APP) coverage:clean
else
	$(SELF)
endif

.PHONY: init
init:
ifeq ($(shell whoami),node)
	npm ci
	$(MAKE) index
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

.PHONY: remove
remove:
ifeq ($(shell whoami),node)
	$(ERROR)
else
	$(COMPOSE) down --rmi all --volumes --remove-orphans
endif
