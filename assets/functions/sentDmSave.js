const sentDmSchema = require('../../models/sentDMSave.js');
const { botName } = require('../../config.json');

async function sentDmSave(interaction, msgID) {
	const userID = interaction.user.id;
	const userTag = interaction.user.tag;
	const guildID = interaction.guild.id;

	const msg = {
		messageContent: interaction.options.getString('message'),
		messageID: msgID,
		targetID: interaction.options.getUser('target').id,
		targetTag: interaction.options.getUser('target').tag,
		timestamp: Date.now(),
	};

	try {
		try {
			await sentDmSchema.findOneAndUpdate(
				{
					guildID,
					userID,
					userTag,
				},
				{
					guildID,
					userID,
					userTag,
					$push: {
						messages: msg,
					},
				},
				{
					upsert: true,
				},
			);
		}
		catch (error) {
			console.error(`[${botName}] Failed to save message to database!`, error);
		}
	}
	catch (error) {
		console.error(`[${botName}] Error saving sent DM to the database!`, error);
	}
}

module.exports.sentDmSave = sentDmSave;

