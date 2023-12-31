# Deployment Guide

| Index                                                                    | Description                                 |
| :----------------------------------------------------------------------- | :------------------------------------------ |
| [Dependencies](#dependencies)                                            | Prerequisite dependencies    |
| [Cloning Repository](#cloning-the-repository)                     | Cloning the project from GitHub to your local machine       |
| [Install Dependencies](#install-dependencies)                     | Installing required core npm dependencies      |
| [CDK Deployment](#cdk-deployment-part-1)                   | Deploying the project |
| [Store API Key](#store-api-key)                   | Create a new API Key for API authentication |

## Dependencies
Before you start deploying, you must have the following dependencies:
- [NodeJS](https://nodejs.org/en/download/)
- [Git](https://git-scm.com/downloads)
- [AWS Account](https://aws.amazon.com/account/) 
- [GitHub Account](https://github.com/) 
- Install the [AWS CLI](https://aws.amazon.com/cli/) tool.
- Install the [AWS CDK](https://docs.aws.amazon.com/cdk/latest/guide/cli.html) CLI tool.


If you do not currently have a configured AWS Account, configure an account with the following instructions:

- Configure the AWS CLI tool for your AWS Account in the `ca-central-1` region, using an IAM user with programmatic access and the "AdministratorAccess" policy (moving forward, we will assume you have [configured a profile](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html) called `parkinsons-project`) by running the following commmand :
  > `aws configure --profile parkinsons-project`

If you already have a configured AWS account, you may use your own configured account to deploy. Please note that if you decide to use your own account to deploy, be sure to change our command line commands to use your profile whenever there is a ```--profile``` command.
```
--profile [YOUR_AWS_PROFILE_HERE]
```


## Install Dependencies
Ensure you are in the root directory of the project, then install the core dependencies:
```
npm install
```

If this command gives you an error, run the following commands instead:
```
rm package-lock.json
npm install
```

Then run the respective npm build command for your operating system:

For Mac OS
```
npm run build
```

For Windows OS
```
npm run build-windows
```

## CDK Deployment
Initialize the CDK stacks (required only if you have not deployed this stack before). 
```
cdk synth --profile parkinsons-project
cdk bootstrap aws://YOUR_AWS_ACCOUNT_ID/ca-central-1 --profile parkinsons-project
```

Deploy the CDK stacks:

```
cdk deploy --all --profile parkinsons-project
```

## Store API Key 

To give the mobile app access to S3, we will create and store an API key that will be passed in as part of the API calls from the app.

In the AWS Console, head to the **AWS Secrets Manager** console and select **Store a new secret**.

Select **Other type of secret** for Secret Type and **aws/secretsmanager** for encryption key. 

Before proceeding with the next section, you will first need to generate a secure 128 bit UUID V4 API key. A UUID generator such as the one found [here](https://www.uuidgenerator.net/version4) can be used.\
**Take note of this API key as you will need to enter this key when deploying the mobile app. If needed, this API key can be viewed in the AWS Secrets Manager console.**

In the **Key/value pairs** section, enter the following key value pair with `api_key` as the key and the API key you generated above as the value:

![Secrets Manager Console](../docs/images/secrets_console.png)


On the next page, enter **APIKey** as the **Secret name** and an optional description.

Leave the remaning settings as default and store the API key. 