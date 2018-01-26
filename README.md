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

Now you can create a new skill project in the current directory.

```bash
$ ask new --template GettingStarted --url https://raw.githubusercontent.com/Pindar/alexa-template/master/templates.json --skill-name my_new_skill
```

**Note**
There is a bug in version `ask-cli@1.0.0-beta.9`. To fix it please open `/usr/local/lib/node_modules/ask-cli/lib/new/git-templates.js:152` and change the following:
```js
if (apis[domain][key].endpoint || apis[domain][key].endpoint.uri) {
```
to 
```js
if (apis[domain][key].endpoint && apis[domain][key].endpoint.uri) {
```


You need to download NodeJS dependencies:

```bash
$ (cd lambda/custom && npm install)
```

*This repository requires a BASH command line interface.*

### Deploy to AWS

**Preperation**

Create your `.[test|dev|prod].env` files based on `lambda/custom/.env.example`. You can add more configuration there and reference it in `serverless.yml` or in the js function.

**First: Deploy Lambda**

1. select staging environment 
```bash 
$ cd lambda/custom && npm run [dev|prod]-env
```
2. deploy to selected environment with
```bash
$ npm run deploy
```
3. From the provided output of the last command copy the value of `SkillLambdaFunctionQualifiedArn` stripping off colon plus number (`:1`) and paste it as URI value in `.ask/config`.

**Second: Deploy Skill**

```bash
$ ask deploy --target skill
$ ask deploy --target model
```


