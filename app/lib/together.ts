import Together from "together-ai";


if (!process.env.TOGETHER_API_KEY) {
  throw new Error('TOGETHER_API_KEY is not defined');
}

export const togetherClient = new Together({
  apiKey: process.env.TOGETHER_API_KEY
});

