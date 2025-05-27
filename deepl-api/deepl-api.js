import { Translator } from 'deepl-node';
import { config } from 'dotenv';

config();

const translator = new Translator(process.env.DEEPL_API_KEY);

export async function deepl(text, lang) {
    const translatedText = await translator.translateText(text, null, lang);
    return translatedText.text;
}