const Discord = require('discord.js');
const bot = new Discord.Client();
const ms = require("ms");
 
 
const token = 'NzA5MzY2NDAyMzMwMzk0NjQ0.Xrk4Sw.p2jSygPfFP4WxKITtf4gpJa00YE';
 
const PREFIX = '!';
 
 
bot.on('ready', () => {
    console.log('This bot is active!');
})
 
bot.on('message', message => {
    let args = message.content.substring(PREFIX.length).split(" ");
 
    switch (args[0]) {
        case 'mute':
            var person  = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));
            if(!person) return  message.reply("I CANT FIND THE USER " + person)
 
            let mainrole = message.guild.roles.find(role => role.name === "Newbie");
            let role = message.guild.roles.find(role => role.name === "mute");
           
 
            if(!role) return message.reply("Couldn't find the mute role.")
 
 
            let time = args[2];
            if(!time){
                return message.reply("You didnt specify a time!");
            }
 
            person.removeRole(mainrole.id)
            person.addRole(role.id);
 
 
            message.channel.send(`@${person.user.tag} has now been muted for ${ms(ms(time))}`)
 
            setTimeout(function(){
               
                person.addRole(mainrole.id)
                person.removeRole(role.id);
                console.log(role.id)
                message.channel.send(`@${person.user.tag} has been unmuted.`)
            }, ms(time));
 
 
   
        break;
    }
 
 
});
 
           
                       
bot.login(token);