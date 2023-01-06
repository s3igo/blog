.PHONY: init
init:
	docker compose run --rm frontend npm ci

.PHONY: dev
dev:
	docker compose up frontend

