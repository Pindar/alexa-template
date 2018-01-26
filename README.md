# alexa-template

This is an opinionates template for Alexa skill deployments. It provides everything you need to start professional development including the testing framework mocha.

## Development

### Pre-requisites

This is a NodeJS Lambda function using [serverless](https://serverless.com/framework/docs/getting-started/) and the [AWS CLI](https://github.com/aws/aws-cli) and skill defintion to be used by [ASK CLI](https://developer.amazon.com/docs/smapi/quick-start-alexa-skills-kit-command-line-interface.html).

You need to initialize ASK CLI with 

```bash
$ ask init
```

You need an [AWS account](https://aws.amazon.com) and an [Amazon developer account](https://developer.amazon.com) to create an Alexa Skill.

You need to download NodeJS dependencies :

```bash
$ (cd lambda/custom && npm install)
```

*This repository requires a BASH command line interface.*

### Deploy to AWS

**Deploy Skill**

```bash
$ ask deploy --target skill
$ ask deploy --target model
```

**Deploy Lambda**

1. select staging environment 
```bash 
$ cd lambda/custom && npm run [dev|prod]-env
```
2. deploy to selected environment with
```bash
$ npm run deploy
```
