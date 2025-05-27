import { SlashCommandBuilder } from "discord.js";
import { serverTag } from "../discord-api/server-tag.js";

export default {
    data: new SlashCommandBuilder()
        .setName('tag')
        .setDescription('change-server-tag')
        .setContexts([0, 1, 2])
        .addStringOption(option =>
            option
                .setName('tag')
                .setDescription('server tag id')
                .setChoices(
                    { name: 'PRO', value: '223070469148901376' },
                    { name: 'MEOW', value: '427067963137589258' },
                    { name: 'DEV', value: '547906569489350657' },
                    { name: 'SOUL', value: '786437953299021844' },
                    { name: 'RAWR', value: '804032421678153819' },
                    { name: 'ToXIC', value: '925274403984506880' },
                    { name: '愛して', value: '1369383012667756694' },
                    { name: 'WTF?', value: '1369486578522525736' },
                )
                .setRequired(true)
        ),
        async execute(interaction) {
            const token = process.env.DISCORD_MY_TOKEN;
            const tagId = interaction.options.getString('tag');

            await interaction.deferReply({ flags: 64 });

            const res = await serverTag(token, tagId);

            if (res) {
                return interaction.followUp({
                    content: `Server-Tag: ${res}`,
                    flags: 64,
                });
            } else {
                return interaction.followUp({
                    content: 'Failed',
                    flags: 64,
                });
            }
        }
}
