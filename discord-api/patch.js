import axios from "axios";

/* edit message */
export async function editMessage(token, channel, id, text) {
    const url = `https://discord.com/api/v9/channels/${channel}/messages/${id}`;
    
    try {
        const res = await axios.patch(url, {
            'content': text,
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'authorization': token,
            }
        });

        return true;
    } catch (err) {
        console.error('エラーが発生:', err.message);
        return false;
    }
}