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
        { name: 'Version', value: version, inline: true },
        { name: 'License', value: license, inline: true },
        { name: 'Uptime', value: millisToMinutesAndSeconds(args.uptime), inline: false },
        { name: 'Active Guilds', value: args.guild_count, inline: false },
      )
      .setTimestamp()
      .setFooter(author, 'https://avatars2.githubusercontent.com/u/12943363?s=460&u=5849837605f47c1f75abb81ab0e00d21e26038a7&v=4');

    message.channel.send(aboutEmbed);
  }
};