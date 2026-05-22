import { Message, EmbedBuilder } from 'discord.js';

module.exports = {
  name: 'timeout',
  async execute(message: Message, args: string[]): Promise<void> {
    if (!message.member?.permissions.has('ModerateMembers')) {
      await message.reply('❌ You do not have permission to timeout members!');
      return;
    }

    const user = message.mentions.users.first();
    if (!user) {
      await message.reply('❌ You must mention a user to timeout!');
      return;
    }

    const minutes = parseInt(args[1]);
    if (isNaN(minutes) || minutes < 1 || minutes > 40320) {
      await message.reply('❌ Please provide a valid duration in minutes (1-40320)!');
      return;
    }

    const member = await message.guild?.members.fetch(user.id);
    if (!member) {
      await message.reply('❌ User not found in this server!');
      return;
    }

    if (!member.moderatable) {
      await message.reply('❌ I cannot timeout this user!');
      return;
    }

    const reason = args.slice(2).join(' ') || 'No reason provided';

    try {
      const durationMs = minutes * 60 * 1000;
      await member.timeout(durationMs, reason);

      const embed = new EmbedBuilder()
        .setColor(0xFFA500)
        .setTitle('User Timed Out')
        .addFields(
          { name: 'User', value: `${user.tag}`, inline: true },
          { name: 'Duration', value: `${minutes} minutes`, inline: true },
          { name: 'Reason', value: reason, inline: true },
          { name: 'Timed out by', value: `${message.author.tag}`, inline: true }
        )
        .setTimestamp();

      await message.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      await message.reply('❌ Failed to timeout the user!');
    }
  },
};
