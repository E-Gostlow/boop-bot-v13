const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Get information about the bots commands!')
		.addStringOption(option => option.setName('command').setDescription('The command you want information on!')),
	async execute(interaction) {

		const colour = Math.floor(Math.random() * 16777215).toString(16);
		const cmd = interaction.options.getString('command');
		const { commands } = interaction.client;

		const generalHelpEmbed = new MessageEmbed()
			.setAuthor('Help')
			.setDescription('Use `/help <command>` to get info about a specific command!')
			.addField('Commands (A-Z)', `${commands.map(command => command.data.name).join(', ')}`)
			.setColor(colour)
			.setFooter('Boop Bot | Developed by RaulTechSupport#1148')
			.setTimestamp();

		if (!cmd) return interaction.reply({ embeds: [generalHelpEmbed], ephemeral: true }); //Sends general help message if no command is selected.

		const name = cmd.toLowerCase();
		const command = commands.get(name);

		if (!command) return interaction.reply({ content: 'Couldn\'t find that command!', embeds: [generalHelpEmbed], ephemeral: true }); //Sends general help message if an invalid command is entered.

		const commandSpecificHelpEmbed = new MessageEmbed()
			.setTitle(`Command: /${command.data.name}`)
			.setDescription(`Description: ${command.data.description}`)
			.setFooter('Boop Bot | Developed by RaulTechSupport#1148');

		await interaction.reply({ embeds: [commandSpecificHelpEmbed], ephemeral: true }); //Sends command specific help message if valid command is entered.
	},
};