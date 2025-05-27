import { Client, ActivityType, Collection, GatewayIntentBits } from 'discord.js';
import "dotenv/config";
import fs from 'node:fs';
import path from 'node:path';


export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

client.commands = new Collection();

// 非同期関数でコマンドの読み込み処理を行う
async function loadCommands() {
  const commandsPath = path.join(process.cwd(), 'commands');
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

  for (const file of commandFiles) {
    const command = (await import(`./commands/${file}`)).default;
    client.commands.set(command.data.name, command);
  }
}

// クライアントの準備が整ったときにコマンドの読み込みを行い、ログインする
client.once('ready', async () => {
  client.user.setPresence({
    activities: [{
      name: 'Discord API',
      type: ActivityType.Playing
    }],
    status: 'online'
  });

  console.log(`Logged in as ${client.user.tag}`);

  // コマンドを読み込んだ後にログインする
  await loadCommands();
  console.log('コマンドが正常にロードされました');
});

// インタラクションの処理
client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;
  
  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'コマンドの実行中にエラーが発生しました。', ephemeral: true });
  }
});


// トークンを使ってログイン
client.login(process.env.DISCORD_BOT_TOKEN);
