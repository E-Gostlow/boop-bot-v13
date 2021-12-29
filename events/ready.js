const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { botName, version, author, logsURL, internalLogChannel } = require('../config.json');

module.exports = (client) => {
	console.log(`${client.user.username} is up and running!`);

	client.user.setActivity(`${botName} v${version} - /help`);

	const viewLogsButton = new MessageActionRow()
		.addComponents(
			new MessageButton()
				.setLabel('View logs!')
				.setStyle('LINK')
				.setURL(logsURL),
		);

	//Send startup message
	const ts = Math.round((new Date()).getTime() / 1000);
	const colour = Math.floor(Math.random() * 16777215).toString(16);
	const bootEmbed = new MessageEmbed()
		.setTitle('Booted!')
		.setDescription(`${botName} has booted at: <t:${ts}>!`)
		.setFooter(`${botName} | Version: ${version} | Developed by ${author}`)
		.setColor(colour);

	client.channels.fetch(internalLogChannel)
		.then(channel => {
			channel.send({ embeds: [bootEmbed], components: [viewLogsButton] }).catch((error) => {
				console.log(`Failed to send a boot message: ${error}`);
			});
		});


};
