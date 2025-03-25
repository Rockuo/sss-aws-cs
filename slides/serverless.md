## Serverless Konfigurace
```yaml [4-10|15-24|33-60]
# serverless.yaml
service: app

provider:
  name: aws
  region: eu-central-1
  environment:
    APP_ENV: ${sls:stage}
    PROPAGATED_ENV: ${env:MS_API_KEY}
    APPLICATION_ENV_CONFIGURATION: ${self:custom.${sls:stage}.myVariable}

plugins:
  - ./vendor/bref/bref

functions:
  order-created-notificator:
    handler: index.php
    description: ''
    runtime: php-83
    architecture: arm64
    memorySize: 256
    vpc: ${self:custom.${sls:stage}.vpc} # allows to configure subnets and security groups per environment
    environment:
      APP_NAME: 'order-created-notificator'


#Exclude files from deployment
package:
  patterns:
    - '!tests/**'


# For simple usecase Pipeline can have only one environment
# if we want different setup per aplication environment, we can separate it here
custom:
  testing:
    myVariable: ${env:MY_VAR_TESTING}
    vpc:
      securityGroupIds:
        - sg-t123 # shared backend SG for LoadBalancer
      subnetIds:
        - subnet-t123a
        - subnet-t123b
        # and so on
  staging:
    myVariable: ${env:MY_VAR_STAGING}
    vpc:
      securityGroupIds:
        - sg-t123 # shared backend SG for LoadBalancer
        subnetIds:
          - subnet-s123a
          - subnet-s123b
  production:
    myVariable: ${env:MY_VAR_PRODUCTION}
    vpc:
      securityGroupIds:
        - sg-t123
      subnetIds:
        - subnet-p123a
        - subnet-p123b
```