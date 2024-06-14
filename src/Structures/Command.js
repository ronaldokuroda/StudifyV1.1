const { ApplicationCommandType } = require('discord.js');

module.exports = class Command {
  constructor(name, description) {
    this.name = name;
    this.description = description;
    this.type = ApplicationCommandType.ChatInput;
    this.options = [];
  }

  async run(client, interaction) {
    console.log('Sem resultados');
  }
}
