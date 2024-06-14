module.exports = class playlist extends Command {
    constructor(...args) {
        super(...args);
        this.name = "playlist";
        this.description = "Ouça a melhor playlist de estudo.";
    }

    async run(client, interaction) {
        await interaction.deferReply({ ephemeral: true });
        const playlistUrl = "https://open.spotify.com/playlist/77s4Vi0bhfgHj0z4amZMFw?si=f70daae1024e4c74";
        await interaction.editReply({ content: playlistUrl });
    }
};

