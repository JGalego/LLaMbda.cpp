import {LlamaModel, LlamaContext, LlamaChatSession} from "node-llama-cpp";

const model = new LlamaModel({
    modelPath: "model.gguf"
});

export const handler = awslambda.streamifyResponse(async (event, responseStream, _context) => {
    const context = new LlamaContext({model});

    const session = new LlamaChatSession({context});

    await session.prompt(JSON.parse(event.body).message, {
        onToken(chunk) {
            responseStream.write(context.decode(chunk));
        }
    });

    responseStream.end();
});