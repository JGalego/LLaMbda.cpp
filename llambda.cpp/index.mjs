import util from "util";
import stream from "stream";
import {getLlama, LlamaChatSession} from "node-llama-cpp";

const pipeline = util.promisify(stream.pipeline);

const llama = await getLlama();

const model = await llama.loadModel({
    modelPath: "model.gguf"
});

export const handler = awslambda.streamifyResponse(async (event, responseStream, _context) => {
    const context = await model.createContext();

    const session = new LlamaChatSession({
        contextSequence: context.getSequence()
    });

    const completionStream = await session.prompt(JSON.parse(event.body).message, {
        onToken(chunk) {
            model.detokenize(chunk);
        }
    });

    await pipeline(completionStream, responseStream);
});
