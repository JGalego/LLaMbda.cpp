FROM public.ecr.aws/lambda/nodejs:20

ARG MODEL_URL

RUN curl -L "${MODEL_URL}" -o "${LAMBDA_TASK_ROOT}/model.gguf"

COPY index.mjs package.json ${LAMBDA_TASK_ROOT}/

RUN npm install

CMD [ "index.handler" ]