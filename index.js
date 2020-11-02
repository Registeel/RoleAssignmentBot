const Discord = require('discord.js');
const bot = new Discord.Client();
const dUtils = require('discord.utils');

TOKEN = 'NjcwNDEzNDc0NDA0MzY4NDE2.XiuBbg.GNWTvbkaUK9ZOGkiE0uhvZ4ZtQ8';
bot.login(TOKEN);

const commandList = ["!diablo3", "!overwatch", "!apex", "!hots", "!lol", "!eso", "!fortnite",
    "!destiny2", "!minecraft", "!ff14"];
const gameList = ["Diablo3 Crew Member", "Overwatch Crew Member", "Apex Crew Member", "HotS Crew Member",
    "LoL Crew Member", "ESO Crew Member", "Fortnite Crew Member", "Destiny2 Crew Member",
    "Minecraft Crew Member", "Final Fantasy 14 Crew Member"];

bot.on('ready', () => {
    console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', async msg => {
    //Ignore messages from bot
    if (msg.author.bot) return;

    if (commandList.includes(msg.content.toLowerCase())) {
        await addRole(msg, bot);
    }

});

async function addRole(msg, client) {
    var index = commandList.indexOf(msg.content.toLowerCase());
    var user = msg.member;
    var username = user.nickname;
    if (!user.nickname || user.nickname == "") {
        username = user.user.username;
    }
    var currRoleId = "";
    //var role = dUtils.get(msg.guild.roles, name = gameList[index]);
    var testRole = "";
    for (var role of msg.guild.roles.cache.entries()) {
        if (role[1].name == gameList[index]) {
            testRole = role[1];
            currRoleId = role[0];
            console.log("Test Role");
            console.log(testRole[0]);
            console.log(testRole[1]);
        }
    }
    console.log(user);
    if (user.roles.cache.get(currRoleId)) {
        console.log("Hit remove");
        await user.roles.remove(testRole);
        await msg.channel.send(username + " has unsubscribed from the " + gameList[commandList.indexOf(msg.content.toLowerCase())] + " role");
    }
    else if (msg.guild.roles.cache.get(currRoleId)) {
        console.log("Hit add");
        await user.roles.add(testRole)
        await msg.channel.send(username + " has subscribed to the " + gameList[commandList.indexOf(msg.content.toLowerCase())] + " role")
    }
    else {
        console.log("Hit missing role");
        await msg.channel.send("No role for " + gameList[commandList.indexOf(msg.content.toLowerCase())])
    }
}
