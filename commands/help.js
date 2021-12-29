const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { botName, version, author } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Get information about the bots commands!')
		.addStringOption(option => option.setName('command').setDescription('The command you want information on!')),
	async execute(interaction) {

		const colour = Math.floor(Math.random() * 16777215).toString(16);
		const cmd = interaction.options.getString('command');
		const { commands } = interaction.client;

		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setLabel('Join our support server!')
					.setStyle('LINK')
					.setURL('https://discord.gg/qgPDUyrun8'),
			);

		const generalHelpEmbed = new MessageEmbed()
			.setAuthor('Help')
			.setDescription('Use `/help <command>` to get info about a specific command!')
			.addField('Commands (A-Z)', `${commands.map(command => command.data.name).join(', ')}`)
			.setColor(colour)
			.setFooter(`${botName} | Version ${version} | Developed by ${author}`);

		if (!cmd) return interaction.reply({ embeds: [generalHelpEmbed], ephemeral: true, components: [row] }); //Sends general help message if no command is selected.

		const name = cmd.toLowerCase();
		const command = commands.get(name);

		if (!command) return interaction.reply({ content: 'Couldn\'t find that command!', embeds: [generalHelpEmbed], ephemeral: true, components: [row] }); //Sends general help message if an invalid command is entered.

		const commandSpecificHelpEmbed = new MessageEmbed()
			.setTitle(`Command: /${command.data.name}`)
			.setDescription(`Description: ${command.data.description}`)
			.setFooter(`${botName} | Version ${version} | Developed by ${author}`);

		await interaction.reply({ embeds: [commandSpecificHelpEmbed], ephemeral: true, components: [row] }); //Sends command specific help message if valid command is entered.
	},
};