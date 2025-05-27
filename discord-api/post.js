import axios from "axios";
import { nonce } from "./nonce.js";

/* send message */
export async function sendMessage(token, channel, text) {
    const url = `https://discord.com/api/v9/channels/${channel}/messages`;
    
    try {
        const res = await axios.post(url, {
            'mobile_network_type': "unknown",
            'content': text,
            'nonce': nonce(),
            'tts': false,
            'flags': 0,
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'authorization': token,
            }
        });

        const id = res.data.id;
        return id;
    } catch (err) {
        console.error('エラーが発生:', err.message);
        return false;
    }
}