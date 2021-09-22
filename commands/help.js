const Discord = require('discord.js');

const {embedColor} = require('../config.json');

const {homepage} = require('../package.json');

module.exports = {
  name: 'help',
  description: 'Help!',
  cooldown: 20,
  aliases: ['h', '?', 'wtf', '', 'what', 'who', 'help'],
  execute: (message, args) => {

    const gitRoot = homepage.split('#')[0];

    const helpEmbed = new Discord.MessageEmbed()
      .setColor(embedColor)
      .setTitle('Hi, I\'m Ico!')
      .setURL(homepage)
      .setDescription('I roll dice. Here\'s how...')
      .setThumbnail(gitRoot + '/blob/master/images/icon.png?raw=true')
      .addField( 'Command triggers', '`!ico` | `/roll` | `/r`', false )
      .addFields(
        { name: 'Roll a single die', value: '`!ico d20`', inline: false },
        { name: 'Roll multiple dice', value: '`!ico 3d6`', inline: false },
        { name: 'Roll high variance', value: '`!ico hv20`', inline: false },
        { name: 'Include a modifier', value: '`!ico 2d69+420`', inline: false },
        { name: 'See this message', value: '`!ico help`', inline: false },
        { name: 'See additional info', value: '`!ico about`', inline: false }
      )
      .addField( 'High Variance Note:','Rolling hv100 produces the sum of two HV percentage dice', false)

    message.channel.send(helpEmbed);

  }
};