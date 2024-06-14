const { EventEmitter } = require('events');
const client = require("../../../index");
const Discord = require("discord.js");

module.exports = class interactionCreate extends EventEmitter {
    constructor(...args) {
        super(...args);
        this.event = "interactionCreate";
    }

    async exec(interaction) {
        if (interaction.type === Discord.InteractionType.ApplicationCommand) {
            console.log(`Command received: ${interaction.commandName}`);

            const cmd = client.slashCommands.get(interaction.commandName);

            if (!cmd) {
                console.log('Command not found');
                await interaction.reply({ content: 'Error: Command not found', ephemeral: true });
                return;
            }

            interaction.member = interaction.guild.members.cache.get(interaction.user.id);

            try {
                console.log('Executing command...');
                await cmd.run(client, interaction);  // Chamar 'run' ao invés de 'execute'
                console.log('Command executed successfully');
            } catch (error) {
                console.error('Error executing command:', error);
                await interaction.reply({ content: 'There was an error executing this command!', ephemeral: true });
            }
        }
    }
};


