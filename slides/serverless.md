## Serverless Konfigurace
```yaml [4-10|8|9|10|15-24|17|19-20|22|23-24|33-60|37|10|38-44|47-52|55-60|22]
# serverless.yaml
service: app

provider:
  name: aws
  region: eu-central-1
  environment:
    APP_ENV: ${sls:stage}
    PROPAGATED_ENV: ${env:MS_API_KEY}
    APP_ENV_CONFIGURATION: ${self:custom.${sls:stage}.myVariable}

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

Notes:
Předem varuji, že jde o pseudokód
1. Kam to chceme nasadit (nejen AWS) a jaké proměnné propagujeme
   1. Serverless přepínače
   2. Propagace proměnných z gitlab pipeline
   3. ENV proměnná definovaná níže
2. Možno definovat více funkci
   1. Handler 
   2. runtime + arhitecture = PHP image
   3. AWS security groups a subnety
   4. APP env (např název appky pro monitoring)
3. Definice Custom proměnných které se vloží do konfigurace 