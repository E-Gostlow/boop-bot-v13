const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
	    .setName("ping")
	    .setDescription("Test to see if the bot isn't broken."),
	async execute(interaction) {
		await interaction.reply("Pong!");
	}
};
