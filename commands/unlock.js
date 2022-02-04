const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { botName, version, author } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('unlock')
		.setDescription('Unlock the Discord!'),
	async execute(interaction) {

		await interaction.deferReply({ ephemeral: true });
		let reply;

		const permission = 'ADMINISTRATOR';

		//All embeds
		const insufficientPermsEmbed = new MessageEmbed()
			.setColor('RED')
			.setTitle('Insufficient Permissions!')
			.setDescription(`You do not have permission to execute this command!\nIt requires the \`${permission}\` permission.`)
			.setFooter({ text:`${botName} | Version ${version} | Developed by ${author}` });
		const successEmbed = new MessageEmbed()
			.setColor('GREEN')
			.setTitle('Success!')
			.setDescription('The Discord has been unlocked successfully!\nPlease check this has been completed correctly by viewing the server as @everyone and then as the Member role.')
			.setFooter({ text:`${botName} | Version ${version} | Developed by ${author}` });


		//Ensure interaction member has permission to execute the command.
		if (!interaction.inGuild) return await interaction.editReply({ content: 'This command cannot be executed inside DM\'s!' });
		if (interaction.guildId !== '662796503160455189') return await interaction.editReply({ content: 'This command cannot be executed in this guild!' });
		if (!interaction.member.permissions.has(permission)) return await interaction.editReply({ embeds: [insufficientPermsEmbed], ephemeral: true });

		interaction.guild.channels.cache.forEach(channel => {
			//Interview, Muted, Archive, Logs, Mod Area, Support
			if (!(channel.parentId === '845816050053939302' || channel.parentId === '823263728609919016' || channel.parentId === '793922862128955392' || channel.parentId === '783493170213814282' || channel.parentId === '772645807580119060' || channel.parentId === '825886769425023006')) {
				try {
					channel.edit({
						permissionOverwrites: [
							{
								id: channel.guild.roles.everyone,
								null: ['VIEW_CHANNEL'],
							},
						],
						reason: 'Unlocking Discord',
					});
				}
				catch (error) {
					reply += `${error}\n`;
				}
			}
			else {
				interaction.editReply({ content: 'Skiped channel in blacklisted parent category.\n' });
			}
		});

		if (reply) {
			await interaction.editReply({ content: reply });
		}
		else {
			await interaction.editReply({ embeds: [successEmbed] });
		}
	},
};