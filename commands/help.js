const Discord = require('discord.js');

const {homepage} = require('../package.json');

module.exports = {
  name: 'help',
  description: 'Help!',
  cooldown: 20,
  aliases: ['h', '?', 'wtf', '', 'what', 'who', 'help'],
  execute: (message, args) => {

    const helpEmbed = new Discord.MessageEmbed()
      .setColor('#ec53ff')
      .setTitle('Hi, I\'m Ico!')
      .setURL(homepage)
      .setDescription('I roll dice. Here\'s how...')
      // .setThumbnail(gitRoot + '/blob/master/images/icon.png?raw=true')
      .addFields(
        { name: 'Roll a single die', value: '`!ico d20`', inline: false },
        { name: 'Roll multiple dice', value: '`!ico 3d6`', inline: false },
        { name: 'Roll high variance', value: '`!ico hv20`', inline: false },
        { name: 'Include a modifier', value: '`!ico 2d69+420`', inline: false },
        { name: 'See this message', value: '`!ico help`', inline: false },
        { name: 'See additional info', value: '`!ico about`', inline: false },
      )

    message.channel.send(helpEmbed);

  }
};