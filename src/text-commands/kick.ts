import { Message, EmbedBuilder } from 'discord.js';

module.exports = {
  name: 'kick',
  async execute(message: Message, args: string[]): Promise<void> {
    if (!message.member?.permissions.has('KickMembers')) {
      await message.reply('❌ You do not have permission to kick members!');
      return;
    }

    const user = message.mentions.users.first();
    if (!user) {
      await message.reply('❌ You must mention a user to kick!');
      return;
    }

    const member = await message.guild?.members.fetch(user.id);
    if (!member) {
      await message.reply('❌ User not found in this server!');
      return;
    }

    if (!member.kickable) {
      await message.reply('❌ I cannot kick this user!');
      return;
    }

    const reason = args.slice(1).join(' ') || 'No reason provided';

    try {
      await member.kick(reason);

      const embed = new EmbedBuilder()
        .setColor(0xFF6B6B)
        .setTitle('User Kicked')
        .addFields(
          { name: 'User', value: `${user.tag}`, inline: true },
          { name: 'Reason', value: reason, inline: true },
          { name: 'Kicked by', value: `${message.author.tag}`, inline: true }
        )
        .setTimestamp();

      await message.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      await message.reply('❌ Failed to kick the user!');
    }
  },
};
