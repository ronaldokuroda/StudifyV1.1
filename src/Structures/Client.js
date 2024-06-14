const fs = require('node:fs');

module.exports = async (client) => {

    const SlashsArray = [];


    // Carregar comandos de barra
    fs.readdir(`./src/SlashCommands`, (error, folder) => {
        folder.forEach((subfolder) => {
            fs.readdir(`./src/SlashCommands/${subfolder}/`, (error, files) => {
                files.forEach((files) => {
                    if (!files?.endsWith(".js")) return;

                    files = require(`../SlashCommands/${subfolder}/${files}`);
                    files = new files();
                    if (!files?.name) return;
                    client.slashCommands.set(files?.name, files);

                    SlashsArray.push(files);

                    console.log(`Comando carregado: ${files.name}`);
                });
            });
        });
    });

    client.on("ready", async () => {
        client.guilds.cache.forEach((guild) => guild.commands.set(SlashsArray))
        console.log(`Comandos registrados em todos os servidores.`);
    });

    client.on("guildCreate", async (guild) => {
        await guild.commands.set(SlashsArray).catch((e) => {});
        console.log(`Bot entrou em um novo servidor: ${guild.name}. Comandos registrados.`);
    });

    fs.readdir(`./src/Events`, (error, folder) => {
        folder.forEach((subfolder) => {
            fs.readdir(`./src/events/${subfolder}/`, (error, files) => {
                files.forEach((files) => {
                    if (!files.endsWith(".js")) return;

                    let event = require(`../events/${subfolder}/${files}`);
                    event = new event();
                    client.on(event.event, event.exec);
                    console.log(`Evento carregado: ${event.event}`);
                });
            });
        });
    });
};