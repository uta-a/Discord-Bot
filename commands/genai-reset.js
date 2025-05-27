import { SlashCommandBuilder } from "discord.js";
import { resetChat } from "../genai-api/genai-api.js";


export default {
    data: new SlashCommandBuilder()
        .setName('genai-reset')
        .setDescription('Gemoni 2.0-Flash')
        .setContexts([0, 1, 2]),
    async execute(interaction) {
        resetChat();
        interaction.reply({
            content: '会話履歴をクリアしました',
            flags: 64,
        });
    },
};