var Discord = require('discord.js')
const bot = new Discord.Client()
bot.login(process.env.DISCORD_TOKEN)

var currCheckIn = null

bot.on('ready', function(evt) {
    bot.user.setActivity("Created by rush2sk8", { type: "STREAMING", url: "https://www.twitch.tv/rov1" })
})

const ROLE_NAME = process.env.ROLE_NAME
const TOURNAMENT_CHANNEL_NAME = process.env.TOURNAMENT_CHANNEL_NAME

bot.on('message', (message) => {
    console.log(message.content)
    const channelName = message.channel.name
    const content = message.content

    //view all of the messages and look for a twitch clip link
    if (channelName == TOURNAMENT_CHANNEL_NAME) {
        if (content == "?start") {
            if (currCheckIn == null) {
                clear_roles(message)
                currCheckIn = message.channel.send("Please react to this message to check in")
                currCheckIn.then((m) => { m.react("✅") })
            } else {
                message.channel.send("Please end the current checkin with ?end")
            }
        } else if (content == "?end") {
            if (currCheckIn == null) {
                message.channel.send("No heats are currently running")
            } else {
                end_checkin(message)
                message.channel.send("Current heat has ended")
            }
        } else if (content == "?clear") {
            clear_roles(message)
        }
    }
})

bot.on('messageReactionAdd', (reaction, user) => {
    if (!user || user.bot || !reaction.message.channel.guild || currCheckIn == null) return;
    if (reaction.emoji.name === "✅") {
        let role = reaction.message.guild.roles.find(r => r.name == ROLE_NAME);
        reaction.message.guild.member(user).addRole(role).catch(console.error);
    }
})

bot.on('messageReactionRemove', (reaction, user) => {
    if (!user || user.bot || !reaction.message.channel.guild || currCheckIn == null) return;
    if (reaction.emoji.name === "✅") {
        let role = reaction.message.guild.roles.find(r => r.name == ROLE_NAME);
        reaction.message.guild.member(user).removeRole(role).catch(console.error);
    }
})

function end_checkin(message) {
    clear_roles(message)
    currCheckIn = null
}

function clear_roles(message) {
    let role = message.guild.roles.find(t => t.name == ROLE_NAME)
    message.guild.members.forEach(member => {
        if (!member.roles.find(t => t.name == ROLE_NAME)) return;
        member.removeRole(role.id)
    })
}