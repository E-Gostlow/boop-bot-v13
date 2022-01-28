const saveTimeout = require('../../models/SaveTimeout.js');
const { botName } = require('../../config.json');

async function realiveReady(client) {

	let guild, role, newDelay, timeoutEndTime;

	//Fetch guild for realive cooldown
	try {
		guild = client.guilds.cache.find(guildID => guildID.id === process.env.REALIVE_GUILD_ID);
	}
	catch {
		console.error(`[${botName}] Unable to fetch guild! Is the bot in the guild?`);
	}

	//Fetch realive role
	try {
		role = guild.roles.cache.find(roleID => roleID.id === process.env.REALIVE_ROLE_ID);
	}
	catch {
		console.error(`[${botName}] Unable to fetch role! Is the bot in the guild or has the role been deleted?`);
	}


	if (guild && role) {

		let endTime = await saveTimeout.findOne();
		try {
			endTime = endTime.timeoutEnd;
			newDelay = endTime - Date.now();

			const date = Date.now();
			timeoutEndTime = date + newDelay;
		}
		catch {
			console.log(`[${botName}] No realive timeout found!`);
		}

		if (newDelay <= 0) {
			role.setMentionable(true, 'Realive cooldown ended').catch(e => console.error(`[${botName}] Failed to make role mentionable: ${e}`));
			await saveTimeout.deleteMany();
		}

		else {
			await saveTimeout.deleteMany().catch(e => console.error(`[${botName}] Failed to clear timeouts: ${e}`));

			const newTimeout = new saveTimeout({
				timeoutEnd: timeoutEndTime,
			});

			await newTimeout.save().catch(e => console.error(`[${botName}] Failed to save timeout: ${e}`));



			setTimeout(async function() {
				role.setMentionable(true, 'Realive cooldown ended').catch(e => console.error(`[${botName}] Failed to make role mentionable: ${e}`));
				await saveTimeout.deleteMany().catch(e => console.error(`[${botName}] Failed to clear timeouts: ${e}`));
			}, newDelay);
		}
	}
}

module.exports.realiveReady = realiveReady;
