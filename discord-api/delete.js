import axios from "axios";

/* delete message */
export async function deleteMessage(token, channel, id) {
    const url = `https://discord.com/api/v9/channels/${channel}/messages/${id}`;
    
    try {
        const res = await axios.delete(url, null,
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