import { SlashCommandBuilder } from "discord.js";
import { sendMessage } from "../discord-api/post.js";
import "dotenv/config";

export default {
    data: new SlashCommandBuilder()
        .setName('spam')
        .setDescription('Spam Text')
        .setContexts([0, 1, 2])
        .addStringOption(option =>
            option
                .setName('text')
                .setDescription('spam-text')
                .setRequired(true)
        )
        .addNumberOption(option =>
            option
                .setName('times')
                .setDescription('送信回数')
                .setRequired(true)
        )
        .addIntegerOption(option =>
            option
                .setName('interval')
                .setDescription('ミリセカンドで')
                .setMinValue(0)
                .setMaxValue(60 *1000)
        ),
    async execute(interaction) {
        const token = process.env.DISCORD_MY_TOKEN;
        const text = interaction.options.getString('text');
        const times = interaction.options.getNumber('times');
        const interval = interaction.options.getInteger('interval');
        const channelId = interaction.channelId;

        await interaction.deferReply({ flags: 64 });

        var count = 0;
        const intv = setInterval(() => {
            /* discord send */
            sendMessage(token, channelId, text);

            ++count;
            if (count == times) {
                clearInterval(intv);
                return interaction.followUp({
                    content: 'Discord Spam!',
                });
            }

        }, interval);
    }
}