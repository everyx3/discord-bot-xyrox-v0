import { Message, EmbedBuilder } from 'discord.js';

module.exports = {
  name: 'ping',
  async execute(message: Message): Promise<void> {
    const sent = await message.reply('🏓 Pinging...');

    const latency = sent.createdTimestamp - message.createdTimestamp;

    const embed = new EmbedBuilder()
      .setColor(0x00FF00)
      .setTitle('🏓 Pong!')
      .addFields(
        { name: 'Bot Latency', value: `${latency}ms`, inline: true },
        { name: 'API Latency', value: `${Math.round(message.client.ws.ping)}ms`, inline: true }
      );

    await sent.edit({ content: '', embeds: [embed] });
  },
};
