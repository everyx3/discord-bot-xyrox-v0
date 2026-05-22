import { Message, EmbedBuilder } from 'discord.js';

module.exports = {
  name: 'userinfo',
  async execute(message: Message, args: string[]): Promise<void> {
    const user = message.mentions.users.first() || message.author;
    const member = message.guild?.members.cache.get(user.id);

    const embed = new EmbedBuilder()
      .setColor(0x0099FF)
      .setAuthor({
        name: user.tag,
        iconURL: user.displayAvatarURL({ size: 256 }),
      })
      .setThumbnail(user.displayAvatarURL({ size: 256 }))
      .addFields(
        { name: 'User ID', value: user.id, inline: true },
        { name: 'Username', value: user.username, inline: true },
        { name: 'Bot', value: user.bot ? '✅ Yes' : '❌ No', inline: true },
        { name: 'Created', value: `<t:${Math.floor(user.createdTimestamp / 1000)}:R>`, inline: true }
      );

    if (member) {
      embed.addFields(
        { name: 'Joined Server', value: `<t:${Math.floor(member.joinedTimestamp! / 1000)}:R>`, inline: true },
        { name: 'Roles', value: member.roles.cache.size > 1 ? member.roles.cache.map((r) => r.toString()).slice(0, 5).join(', ') : 'None', inline: false }
      );
    }

    await message.reply({ embeds: [embed] });
  },
};
