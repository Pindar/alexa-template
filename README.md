# alexa-template

This is an opinionated template for Alexa skill development. It provides everything you need to start professional, test driven development right away.

## Development

### Pre-requisites

This is a NodeJS Lambda function using [serverless](https://serverless.com/framework/docs/getting-started/) and the [AWS CLI](https://github.com/aws/aws-cli) and skill defintion to be used by [ASK CLI](https://developer.amazon.com/docs/smapi/quick-start-alexa-skills-kit-command-line-interface.html).

You need to install and initialize ASK CLI as a first step with 

```bash
$ ask init
```

You need an [AWS account](https://aws.amazon.com) and an [Amazon developer account](https://developer.amazon.com) to create an Alexa Skill.

Now you can create a new skill project in the current directory.

```bash
$ ask new --template GettingStarted --url https://raw.githubusercontent.com/Pindar/alexa-template/master/templates.json --skill-name my_new_skill
```

You need to download NodeJS dependencies:

```bash
$ npm install
```

*This repository requires a BASH command line interface.*

### Deploy to AWS

**Preperation**

Create your `.env.[test|dev|prod].yml` files based on `lambda/custom/.env.example.yml`. You can add more configuration there and reference it in `serverless.yml` or in your js function.

**First: Deploy Lambda**

1. deploy to specified environment with
```bash
$ npm run deploy --prefix=custom/lambda -- --stage [green|blue] --config [dev|production]
```
2. From the provided output of the last command copy the value of `SkillLambdaFunctionQualifiedArn` stripping off colon plus number (e.g., `:1`) and paste it as URI value in `.ask/config`.

**Second: Deploy Skill**

```bash
$  npm run deploy
```

## Deployment Strategy: Blue / Green

To have a seamless blue/green deployment experience with Alexa skills all three layers are independently managed. 

1. Alexa models and skill definition is deployed with ask-cli/Alexa Skill Management API (SMAPI)
2. Lambda function is deployed with serverless framework
3. Storage is deployed with aws-cli cloudformation templates


V1: GREEN is Live, BLUE is in development

```
+--------------------+      +----------------+                +-----------------+
|                    |      |                |                |                 |
| Alexa Development  +------> Skill BLUE     +----------------> DynamoDB DEV    |
|   models           |      |                |                |                 |
|   skill            +----+ |                |                |                 |
+-+------------------+    | +----------------+                +-----------------+
                          |
                          |
+--------------------+    | +----------------+                +-----------------+
|                    |    | |                |                |                 |
| Alexa Live         +------> Skill GREEN    +----------------> DynamoDB Prod   |
|   models           |    | |                |                |                 |
|   skills           +-+  | |                |                |                 |
+--------------------+ |  | +----------------+                +-----------------+
                       |  |
                       |  |                                   +-----------------+
                       |  |                                   |                 |
                       |  +-----------------------------------> S3 Assets Store |
                       |                                      |                 |
                       +-------------------------------------->                 |
                                                              +-----------------+
```


CERTIFICATION: BLUE connected to production database
<pre>
+--------------------+      +----------------+                +-----------------+
|                    |      |                |                |                 |
| Alexa Development  +------> Skill BLUE     +----------+     | DynamoDB DEV    |
|  models            |      |                |          |     |                 |
|  skill             +----+ |                |          |     |                 |
+--------------------+    | +----------------+          |     +-----------------+
                          |                             |
                          |                             |
+--------------------+    | +----------------+          |     +-----------------+
|                    |    | |                |          +----->                 |
| Alexa Live         +------> Skill GREEN    +----------------> DynamoDB PROD   |
|  models            |    | |                |                |                 |
|  skills            +-+  | |                |                |                 |
+--------------------+ |  | +----------------+                +-----------------+
                       |  |
                       |  |                                   +-----------------+
                       |  |                                   |                 |
                       |  +-----------------------------------> S3 Assets Store |
                       |                                      |                 |
                       +-------------------------------------->                 |
                                                              +-----------------+
</pre>

V2: BLUE is Live, GREEN is in development

<pre>
+--------------------+      +----------------+                +-----------------+
|                    |      |                |                |                 |
| Alexa Live         +------> Skill BLUE     +----------+     | DynamoDB DEV    |
|   models           |      |                |          |     |                 |
|   skill            +----+ |                |     +---------->                 |
+--------------------+    | +----------------+     |    |     +-----------------+
                          |                        |    |
                          |                        |    |
+--------------------+    | +----------------+     |    |     +-----------------+
|                    |    | |                |     |    +----->                 |
| Alexa Development  +------> Skill GREEN    +-----+          | DynamoDB PROD   |
|   models           |    | |                |                |                 |
|   skills           +-+  | |                |                |                 |
+--------------------+ |  | +----------------+                +-----------------+
                       |  |
                       |  |                                   +-----------------+
                       |  |                                   |                 |
                       |  +-----------------------------------> S3 Assets Store |
                       |                                      |                 |
                       +-------------------------------------->                 |
                                                              +-----------------+
</pre>
