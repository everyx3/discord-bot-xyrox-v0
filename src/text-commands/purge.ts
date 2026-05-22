import { Message, EmbedBuilder } from 'discord.js';

module.exports = {
  name: 'purge',
  async execute(message: Message, args: string[]): Promise<void> {
    if (!message.member?.permissions.has('ManageMessages')) {
      await message.reply('❌ You do not have permission to manage messages!');
      return;
    }

    const amount = parseInt(args[0]);
    if (isNaN(amount) || amount < 1 || amount > 100) {
      await message.reply('❌ Please provide a valid amount (1-100)!');
      return;
    }

    try {
      const messages = await message.channel?.messages.fetch({ limit: amount + 1 });
      const deletedCount = await message.channel?.bulkDelete(messages!);

      const embed = new EmbedBuilder()
        .setColor(0x00FF00)
        .setTitle('Messages Purged')
        .addFields(
          { name: 'Amount', value: `${deletedCount?.size || 0} messages deleted`, inline: true }
        )
        .setTimestamp();

      const reply = await message.reply({ embeds: [embed] });
      setTimeout(() => reply.delete(), 5000);
    } catch (error) {
      console.error(error);
      await message.reply('❌ Failed to purge messages!');
    }
  },
};
