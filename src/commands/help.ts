import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Show all available commands'),

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const embed = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle('📚 Bot Commands')
      .setDescription('Use `/` for slash commands and `.` for text commands')
      .addFields(
        {
          name: '🛡️ Moderation Commands (Slash)',
          value: '• `/kick` - Kick a user from the server\n• `/ban` - Ban a user from the server\n• `/timeout` - Timeout (mute) a user\n• `/warn` - Warn a user',
          inline: false,
        },
        {
          name: '🔧 Utility Commands (Slash)',
          value: '• `/userinfo` - Get user information\n• `/serverinfo` - Get server information\n• `/ping` - Check bot latency\n• `/purge` - Delete messages',
          inline: false,
        },
        {
          name: 'Text Commands (.)',
          value: '• `.kick <user> [reason]` - Kick a user\n• `.ban <user> [reason]` - Ban a user\n• `.timeout <user> <minutes> [reason]` - Timeout a user\n• `.warn <user> [reason]` - Warn a user\n• `.userinfo [user]` - Get user info\n• `.serverinfo` - Get server info\n• `.ping` - Check latency\n• `.purge <amount>` - Delete messages',
          inline: false,
        }
      )
      .setFooter({ text: 'Required permissions may apply for some commands' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
