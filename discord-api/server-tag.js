import axios from "axios";
import "dotenv/config";

export async function serverTag(token, id) {
    const url = 'https://discord.com/api/v9/users/@me/clan';

    try {
        /* server tag */
        const res = await axios.put(url, {
            "identity_guild_id": id,
            "identity_enabled": true,
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'authorization': token,
            }
        });

        const tagName = res.data.clan.tag;
        return tagName;
    } catch (err) {
        console.error('エラーが発生:', err.message);
        return false;
    }
}
