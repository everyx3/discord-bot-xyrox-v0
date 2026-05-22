import { Message, EmbedBuilder } from 'discord.js';

module.exports = {
  name: 'warn',
  async execute(message: Message, args: string[]): Promise<void> {
    if (!message.member?.permissions.has('ModerateMembers')) {
      await message.reply('❌ You do not have permission to warn members!');
      return;
    }

    const user = message.mentions.users.first();
    if (!user) {
      await message.reply('❌ You must mention a user to warn!');
      return;
    }

    const reason = args.slice(1).join(' ') || 'No reason provided';

    try {
      // Send DM to the user
      await user.send({
        embeds: [
          new EmbedBuilder()
            .setColor(0xFFFF00)
            .setTitle('You have been warned')
            .addFields(
              { name: 'Server', value: message.guild?.name || 'Unknown', inline: false },
              { name: 'Reason', value: reason, inline: false },
              { name: 'Warned by', value: message.author.tag, inline: false }
            )
            .setTimestamp(),
        ],
      });
    } catch (error) {
      console.warn(`Could not DM ${user.tag}`);
    }

    const embed = new EmbedBuilder()
      .setColor(0xFFFF00)
      .setTitle('User Warned')
      .addFields(
        { name: 'User', value: `${user.tag}`, inline: true },
        { name: 'Reason', value: reason, inline: true },
        { name: 'Warned by', value: `${message.author.tag}`, inline: true }
      )
      .setTimestamp();

    await message.reply({ embeds: [embed] });
  },
};
