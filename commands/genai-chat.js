import { SlashCommandBuilder, AttachmentBuilder } from "discord.js";
import axios from "axios";
import { runChat } from "../genai-api/genai-api.js";


export default {
    data: new SlashCommandBuilder()
        .setName('genai')
        .setDescription('Gemoni 2.0 Flash')
        .setContexts([0, 1, 2])
        .addStringOption(option =>
            option
                .setName('prompt')
                .setDescription('プロンプト')
                .setRequired(true)
        )
        .addBooleanOption(option =>
            option
                .setName('quiet')
                .setDescription('自分だけに見えるようにする')
        )
        .addAttachmentOption(option =>
            option
                .setName('file_1')
                .setDescription('ファイル')
        )
        .addAttachmentOption(option =>
            option
                .setName('file_2')
                .setDescription('ファイル')
        )
        .addAttachmentOption(option =>
            option
                .setName('file_3')
                .setDescription('ファイル')
        ),
    async execute(interaction) {
        const prompt = interaction.options.getString('prompt');
        const quiet = interaction.options.getBoolean('quiet');
        const file1 = interaction.options.getAttachment('file_1');
        const file2 = interaction.options.getAttachment('file_2');
        const file3 = interaction.options.getAttachment('file_3');

        /* 一度返答 */
        await interaction.deferReply({
            ephemeral: quiet ?? false,
        });

        /* 配列にurlを追加 */
        var files = [file1, file2, file3].filter(Boolean);
        var attachments = [];

        const fileParts = await Promise.all(
            files.map(async (file) => {
                const res = await axios.get(file.url, {
                    responseType: 'arraybuffer',
                });

                const buffer = Buffer.from(res.data, 'binary');

                const attachment = new AttachmentBuilder(buffer, { name: file.name });
                attachments.push(attachment);

                const base64 = buffer.toString('base64');
                const mimeType = res.headers['content-type'];
                return {
                    inlineData: {
                        data: base64,
                        mimeType,
                    },
                };
            })
        );

        /* Gemini APIで処理 */
        const result = await runChat([
            prompt,
            ...fileParts,
        ]);

        if (!result) {
            return interaction.followUp({
                content: 'API上限に達しました',
            });
        }

        /* 2000文字を超える場合 */
        if (result.length > 2000) {
            const buffer = Buffer.from(result, 'utf-8');
            const file = new AttachmentBuilder(buffer, { name: 'response.txt' });

            return interaction.followUp({
                files: [file],
            });
        }

        return interaction.followUp({
                content: result,
                files: [...attachments]
            });
    },
};