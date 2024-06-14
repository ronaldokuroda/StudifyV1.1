const { Client, Collection, GatewayIntentBits, Partials } = require("discord.js");
require('dotenv').config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildMessageReactions,
        
    ],
    partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

module.exports = client;

global["Command"] = require("./src/Structures/Command.js");
global["events"] = require("./src/Structures/events.js");

client.slashCommands = new Collection();

require("./src/Structures/Client.js")(client);


client.login(process.env.token);