import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('userinfo')
    .setDescription('Get information about a user')
    .addUserOption((option) =>
      option
        .setName('user')
        .setDescription('The user to get info about (defaults to you)')
        .setRequired(false)
    ),

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const user = interaction.options.getUser('user') || interaction.user;
    const member = await interaction.guild?.members.fetch(user.id);

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
        { name: 'Roles', value: member.roles.cache.size > 1 ? member.roles.cache.map((r) => r.toString()).join(', ') : 'None', inline: false }
      );
    }

    await interaction.reply({ embeds: [embed] });
  },
};
