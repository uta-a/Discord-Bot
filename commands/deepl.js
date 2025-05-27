import { SlashCommandBuilder } from "discord.js";
import { deepl } from "../deepl-api/deepl-api.js";


export default {
    data: new SlashCommandBuilder()
        .setName('deepl')
        .setDescription('translate by deepl')
        .setContexts([0, 1, 2])
        .addStringOption(option =>
            option
                .setName('text')
                .setDescription('翻訳元')
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName('language')
                .setDescription('翻訳言語')
                .setChoices(
                    { name: '日本語 (JA)', value: 'JA' },
                    { name: '英語 (EN-US)', value: 'EN-US' },
                    { name: 'アラビア語（AR）', value: 'AR' },
                    { name: 'フランス語 (FR)', value: 'FR' },
                    { name: 'ドイツ語 (DE)', value: 'DE' },
                    { name: 'スペイン語 (ES)', value: 'ES' },
                    { name: 'イタリア語 (IT)', value: 'IT' },
                    { name: 'ポルトガル語 (PT)', value: 'PT' },
                    { name: 'オランダ語 (NL)', value: 'NL' },
                    { name: 'ロシア語 (RU)', value: 'RU' },
                )
                .setRequired(true)
        )
        .addBooleanOption(option =>
            option
                .setName('quiet')
                .setDescription('自分だけに見えるようにする')
        ),
    async execute(interaction) {
        const text = interaction.options.getString('text');
        const lang = interaction.options.getString('language');
        const quiet = interaction.options.getBoolean('quiet');

        await interaction.deferReply({
            ephemeral: quiet ?? false,
        });

        // Deepl APIで翻訳処理
        const translatedText = await deepl(text, lang);

        await interaction.followUp({
            content: `翻訳元：${text}\n翻訳後：${translatedText}`,
        });
    }
}
