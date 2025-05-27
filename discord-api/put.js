import axios from "axios";

/* put emoji */
export async function putEmoji(token, channel, id, emoji) {
    const encode_emoji = encodeURIComponent(emoji);
    const url = `https://discord.com/api/v9/channels/${channel}}/messages/${id}/reactions/${encode_emoji}/%40me?location=Message%20Reaction%20Picker&type=0`;

    try {
        const res = await axios.put(url, null, {
            'Content-Type': 'application/json',
            'authorization': token,
        });

        return true;
    } catch (err) {
        console.error('エラーが発生:', err.message);
        return false;
    }
}