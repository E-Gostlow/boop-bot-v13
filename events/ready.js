const { botName, version } = require('../config.json');

module.exports = (client) => {
	console.log(`${client.user.username} is up and running!`);

	client.user.setActivity(`${botName} v${version} - /help`);
};
