import { Message, EmbedBuilder } from 'discord.js';

module.exports = {
  name: 'ban',
  async execute(message: Message, args: string[]): Promise<void> {
    if (!message.member?.permissions.has('BanMembers')) {
      await message.reply('❌ You do not have permission to ban members!');
      return;
    }

    const user = message.mentions.users.first();
    if (!user) {
      await message.reply('❌ You must mention a user to ban!');
      return;
    }

    const member = await message.guild?.members.fetch(user.id).catch(() => null);
    if (member && !member.bannable) {
      await message.reply('❌ I cannot ban this user!');
      return;
    }

    const reason = args.slice(1).join(' ') || 'No reason provided';

    try {
      await message.guild?.bans.create(user, { reason: reason });

      const embed = new EmbedBuilder()
        .setColor(0xFF0000)
        .setTitle('User Banned')
        .addFields(
          { name: 'User', value: `${user.tag}`, inline: true },
          { name: 'Reason', value: reason, inline: true },
          { name: 'Banned by', value: `${message.author.tag}`, inline: true }
        )
        .setTimestamp();

      await message.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      await message.reply('❌ Failed to ban the user!');
    }
  },
};
