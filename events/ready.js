const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { botName, version, author, logsURL, internalLogChannel } = require('../config.json');
const { realiveReady } = require('./event_functions/realiveReady.js');
const mongo = require('../mongo');

module.exports = async (client) => {
	console.log(`[${botName}] ${client.user.username} is up and running!`);

	client.user.setActivity(`${botName} v${version} - /help`); //Set bot activity.

	await mongo(); //Initialise mongo connection.

	realiveReady(client); //Enable realive role cooldown if one existed before bot restarted.

	//Create view log button
	const viewLogsButton = new MessageActionRow()
		.addComponents(
			new MessageButton()
				.setLabel('View logs!')
				.setStyle('LINK')
				.setURL(logsURL),
		);

	//Construct startup message embed
	const ts = Math.round((new Date()).getTime() / 1000);
	const colour = Math.floor(Math.random() * 16777215).toString(16);
	const bootEmbed = new MessageEmbed()
		.setTitle('Booted!')
		.setDescription(`${botName} has booted at: <t:${ts}>!`)
		.setFooter({ text:`${botName} | Version ${version} | Developed by ${author}` })
		.setColor(colour);

	//Send startup message
	try {
		const c = await client.channels.fetch(internalLogChannel).catch(e => console.error(`[${botName}] Failed to fetch channel: ${e}`));
		c.send({ embeds: [bootEmbed], components: [viewLogsButton] }).catch((error) => {
			console.error(`[${botName}] Failed to send a boot message: ${error}`);
		});
	}
	catch (error) {
		console.error(`[${botName}] Failed to send a boot message: ${error}`);
	}


};
