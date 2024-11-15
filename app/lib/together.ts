import Together from "together-ai";
import { siteConfig } from './site-config';

if (!process.env.TOGETHER_API_KEY) {
  throw new Error('TOGETHER_API_KEY is not defined');
}

export const togetherClient = new Together({
  apiKey: process.env.TOGETHER_API_KEY
});

