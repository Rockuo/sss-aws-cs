## Gitlab CI/CD
```yml [8-16|18-21|23-33]
image: ${BASE_WORKER_IMAGE}

stages:
  - compile
  - test
  - deploy

compile:
  stage: compile
  script:
    - composer install --no-interaction --no-scripts
    - composer conf
  artifacts:
    paths:
      - vendor/
    expire_in: 1 week

test-unit:
  stage: test
  script:
    - composer test-unit

# other tests (codestyle, static analysis and so on)

testing:
  stage: deploy
  when: manual
  script:
    - serverless deploy --stage=testing

# other environments
# ...
```