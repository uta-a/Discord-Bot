import { GoogleGenerativeAI } from "@google/generative-ai";
import 'dotenv/config';

const genai = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const model = genai.getGenerativeModel({ model: 'gemini-2.0-flash' });
var chat = model.startChat({
    history: [],
});

export async function runChat(prompt) {
    if (!chat) return;

    const result = (await chat.sendMessage(prompt)).response;
    return result.text();
}

export function resetChat() {
    chat = model.startChat({
        history: [],
    });
}