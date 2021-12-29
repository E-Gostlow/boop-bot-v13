module.exports = async (client, interaction) => {
	const { commandName } = interaction;
	if (!interaction.isCommand() || !client.commands.has(commandName)) return;

	await client.commands.get(commandName).execute(interaction);
};
