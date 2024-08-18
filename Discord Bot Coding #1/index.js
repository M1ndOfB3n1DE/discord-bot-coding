const { Client, GatewayIntentBits, Collection, ActivityType } = require('discord.js');
const { config } = require('dotenv');
const fs = require('fs');
const { type } = require('os');

config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    
    const statuses = [
        { type: ActivityType.Playing, name: 'on Minecraft'},
        { type: ActivityType.Listening, name: 'Spotify'},
        { type: ActivityType.Watching, name: 'Youtube'},
        { type: ActivityType.Competing, name: 'Minecraft Events'}
    ];

    function updateStatus() {
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
        client.user.setActivity(randomStatus.name, { type: randomStatus.type });
    }

    updateStatus();
    setInterval(updateStatus, 50000); // 1 min = 60000 ms || 

});


client.login(process.env.Discord_TOKEN)