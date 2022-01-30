const { generateConfig } = require('../assets/generateConfig.js');


module.exports = async (client, guild) => {

	await generateConfig(guild);

};
