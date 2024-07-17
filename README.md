# LLaMbda.cpp 🦙🔥

## Overview

Learn how to run [LLaMA.cpp](https://github.com/withcatai/node-llama-cpp) at scale on [AWS Lambda](https://aws.amazon.com/lambda/) using [function URLs](https://docs.aws.amazon.com/lambda/latest/dg/lambda-urls.html) and [response streaming](https://aws.amazon.com/blogs/compute/introducing-aws-lambda-response-streaming/).

## Instructions

0. Set up AWS credentials.

    > 💡 For more information on how to do this, please refer to the [AWS Boto3 documentation](https://boto3.amazonaws.com/v1/documentation/api/latest/guide/credentials.html) (Developer Guide > Credentials).

    ```bash
    # Option 1: (recommended) AWS CLI
    aws configure

    # Option 2: environment variables
    export AWS_ACCESS_KEY_ID=...
    export AWS_SECRET_ACCESS_KEY=...
    export AWS_DEFAULT_REGION=...
    ```

1. Build and deploy the application.

    ```bash
    # 🏗️ Build
    sam build --use-container

    # 🚀 Deploy
    sam deploy --guided

    # ❗ Don't forget to note down the function URL
    export FUNCTION_URL=`sam list stack-outputs --stack-name llambda.cpp --output json | jq -r '.[] | select(.OutputKey == "LLaMbdaCppFunctionUrl") | .OutputValue'`
    ```

2. Test it out!

    **SAM**

    ```bash
    sam remote invoke --stack-name llambda.cpp --event '{"body": "{\"message\": \"Explain the theory of relativity.\"}"}'
    ```

    **cURL**

    ```bash
    curl --no-buffer \
         --silent \
         --aws-sigv4 "aws:amz:$AWS_DEFAULT_REGION:lambda" \
         --user "$AWS_ACCESS_KEY_ID:$AWS_SECRET_ACCESS_KEY" \
         -H "x-amz-security-token: $AWS_SESSION_TOKEN" \
         -H "content-type: application/json" \
         -d '{"message": "Explain the theory of relativity."}' \
         $FUNCTION_URL
    ```
