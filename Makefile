REPORTER ?= spec
MOCHA ?= mocha
TESTS = $(addprefix test/,api.js)

.PHONY: test coverage

test:
	NODE_ENV=test ${MOCHA} --reporter $(REPORTER) --recursive -g '${FILTER}'

coverage:
	NODE_ENV=test istanbul cover -- _mocha --recursive -R ${REPORTER} -g '${FILTER}'

lint:
	eslint src test

lint-fix:
	eslint src test --fix
