const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { sentDmSave } = require('../assets/functions/sentDmSave');
const { botName, version, author, supportURL, debug } = require('../config.json');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('dm')
		.setDescription('Send a dm to a user from the bot!')
		.addUserOption(option => option.setName('target').setDescription('The user to send the message to!')
			.setRequired(true))
		.addStringOption(option => option.setName('message').setDescription('The message to the user!')
			.setRequired(true)),
	async execute(interaction) {

		await interaction.deferReply({ ephemeral: true });

		const permission = 'ADMINISTRATOR';

		const colour = Math.floor(Math.random() * 16777215).toString(16);
		const target = interaction.options.getUser('target');
		const message = interaction.options.getString('message');

		//Ensure interaction member has permission to execute the command.
		if (!interaction.member.permissions.has(permission)) return await interaction.reply({ embeds: [insufficientPermsEmbed], ephemeral: true });
		if (!interaction.inGuild) return await interaction.reply({ content: 'This command cannot be executed inside DM\'s!', components: [supportButton] });


		const sentFromButton = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setLabel(`Sent from: ${interaction.guild.name}`)
					.setStyle('SECONDARY')
					.setCustomId('sentFromButton')
					.setDisabled(true),
			);
		//Support button
		const supportButton = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setLabel('Report this message')
					.setStyle('LINK')
					.setURL(supportURL),
			);
		//All embeds
		const insufficientPermsEmbed = new MessageEmbed()
			.setColor('RED')
			.setTitle('Insufficient Permissions!')
			.setDescription(`You do not have permission to execute this command!\nIt requires the \`${permission}\` permission.`)
			.setFooter({ text:`${botName} | Version ${version} | Developed by ${author}` });
		const cannotDmEmbed = new MessageEmbed()
			.setColor('RED')
			.setTitle('Error!')
			.setDescription('Could not send a DM to this user! They likely have DM\'s disabled.')
			.setFooter({ text:`${botName} | Version ${version} | Developed by ${author}` });
		const dmSentEmbed = new MessageEmbed()
			.setColor(colour)
			.setTitle('Success!')
			.setDescription(`A DM has been sent to ${target}.`)
			.setFooter({ text:`${botName} | Version ${version} | Developed by ${author}` });

		try {
			await target.send({ content: message, components: [sentFromButton, supportButton] }).then(async (msg) => {
				await sentDmSave(interaction, msg.id); //Log DM to database
			});
			if (debug) console.log(`[${botName}] Sent DM from ${interaction.guild.name} with message: ${message}`);

			return await interaction.editReply({ embeds: [dmSentEmbed], ephemeral: true });
		}
		catch (error) {
			if (debug) console.error(`[${botName}] An error has occured while sending a DM from the DM command: ${error}`);
			try {
				await interaction.editReply({ embeds: [cannotDmEmbed], ephemeral: true });
			}
			catch (e) {
				console.error(e);
			}
		}

	},
};