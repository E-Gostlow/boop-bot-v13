//const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
//const { botName, version, author, logsURL, internalLogChannel } = require('../config.json');
const saveTimeout = require('../models/SaveTimeout.js');
const delay = 3600000;

module.exports = async (client, message) => {

	//Realive mention check - If realive role is mentioned make role unmentionable.
	if (message.mentions.roles.first() !== undefined) {
		if (message.mentions.roles.first().id === '812195138699919373' && message.author.bot === false) {
			message.mentions.roles.first().setMentionable(false, 'Realive cooldown');

			const date = Date.now();
			const timeoutEndTime = date + delay;

			await saveTimeout.deleteMany();

			const newTimeout = new saveTimeout({
				timeoutEnd: timeoutEndTime,
			});

			await newTimeout.save().catch(e => console.log(`Failed to save timeout: ${e}`));

			setTimeout(function() {
				message.mentions.roles.first().setMentionable(true, 'Realive cooldown ended');
			}, delay);
		}
	}
	//End of realive mention check



};//812195138699919373