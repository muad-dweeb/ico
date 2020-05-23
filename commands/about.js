const Discord = require('discord.js');

const {version, homepage, license, author} = require('../package.json');

const {millisToMinutesAndSeconds} = require('../util.js');

module.exports = {
  name: 'about',
  description: 'About Ico',
  cooldown: 20,
  aliases: ['a'],
  execute: (message, args) => {

    const gitRoot = homepage.split('#')[0];

    const aboutEmbed = new Discord.MessageEmbed()
      .setColor('#ec53ff')
      .setTitle('About Ico')
      .setURL(homepage)
      .setDescription('Node.js dice roller')
      .setThumbnail(gitRoot + '/blob/master/images/icon.png?raw=true')
      .addFields(
        { name: 'Author', value: '[muad-dweeb](https://github.com/muad-dweeb/ico/ \'Hi :)\')'},
        { name: 'Version', value: version, inline: true },
        { name: 'License', value: license, inline: true },
        { name: 'Uptime', value: millisToMinutesAndSeconds(args.uptime), inline: false },
        { name: 'Active Guilds', value: args.guild_count, inline: false },
      )

    message.channel.send(aboutEmbed);
  }
};