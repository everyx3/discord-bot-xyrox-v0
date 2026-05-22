import { Message, EmbedBuilder } from 'discord.js';

module.exports = {
  name: 'serverinfo',
  async execute(message: Message, args: string[]): Promise<void> {
    const guild = message.guild;

    if (!guild) {
      await message.reply('❌ This command can only be used in a server!');
      return;
    }

    const owner = await guild.fetchOwner();
    const memberCount = guild.memberCount;
    const channelCount = guild.channels.cache.size;
    const roleCount = guild.roles.cache.size;

    const embed = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle(guild.name)
      .setThumbnail(guild.iconURL({ size: 256 }) || null)
      .addFields(
        { name: 'Server ID', value: guild.id, inline: true },
        { name: 'Owner', value: owner.user.tag, inline: true },
        { name: 'Members', value: memberCount.toString(), inline: true },
        { name: 'Channels', value: channelCount.toString(), inline: true },
        { name: 'Roles', value: roleCount.toString(), inline: true },
        { name: 'Created', value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:R>`, inline: true },
        { name: 'Verification Level', value: guild.verificationLevel.toString(), inline: true }
      )
      .setTimestamp();

    await message.reply({ embeds: [embed] });
  },
};
