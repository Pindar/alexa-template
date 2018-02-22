#!/bin/bash -e

STACK_NAME_BASE="skill-sample-nodejs-hello-world"

# Database
for stage in dev prod
do
aws cloudformation create-stack \
  --stack-name ${STACK_NAME_BASE}-${stage} \
  --parameters ParameterKey=SkillSessionTableName,ParameterValue=${STACK_NAME_BASE}-${stage} \
  --tags Key=APPLICATION,Value=${STACK_NAME_BASE} Key=TYPE,Value=database Key=STAGE,Value=${stage} \
  --template-body file://$(pwd)/dynamodb.yml
done

# S3 Store
aws cloudformation create-stack \
  --stack-name ${STACK_NAME_BASE}-store \
  --parameters ParameterKey=SkillAssetBucket,ParameterValue=${STACK_NAME_BASE}-store \
  --tags Key=APPLICATION,Value=${STACK_NAME_BASE} Key=TYPE,Value=store \
  --template-body file://$(pwd)/s3.yml
