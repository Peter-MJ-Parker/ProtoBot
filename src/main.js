const config = require("../private/config.json");
const Discord = require("discord.js");
// const path = require("path");
const fs = require("fs");
// const checkIsWindows = require("./helpers/check-os");

const client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.DirectMessageReactions,
        Discord.GatewayIntentBits.DirectMessageTyping,
        Discord.GatewayIntentBits.DirectMessages,
        Discord.GatewayIntentBits.GuildBans,
        Discord.GatewayIntentBits.GuildEmojisAndStickers,
        Discord.GatewayIntentBits.GuildIntegrations,
        Discord.GatewayIntentBits.GuildInvites,
        Discord.GatewayIntentBits.GuildMembers,
        Discord.GatewayIntentBits.GuildMessageReactions,
        Discord.GatewayIntentBits.GuildMessageTyping,
        Discord.GatewayIntentBits.GuildPresences,
        Discord.GatewayIntentBits.GuildScheduledEvents,
        Discord.GatewayIntentBits.GuildVoiceStates,
        Discord.GatewayIntentBits.GuildWebhooks,
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.MessageContent,
        Discord.GatewayIntentBits.GuildMessages
    ],
    partials: [
        Discord.Partials.Channel,
        Discord.Partials.Message
    ]
});

//init or something
const event_f = fs.readdirSync("./src/events").filter(f => f.endsWith(".js"));
client.commands = new Discord.Collection();
const command_f = fs.readdirSync("./src/commands").filter(f => f.endsWith(".js"));

/* Command handler */
for (const file of command_f) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.data.name, command);
}

client.on("messageCreate", (message) => console.log("heherherh"));

/* Event handler */
for (const file of event_f) {
    const event = require(`./events/${file}`);

    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
        //client.on("messageCreate", (...args) => console.log("hhhhhhh"))
    }
}

client.login(config.Discord.token);

// client.user.setPresence({
//     status: "idle",
//     afk: false,
//     activities: [
//         {
//             name: "soon",
//             type: "Custom"
//         }
//     ]
// });

// Read more into docs for better error handling lol
