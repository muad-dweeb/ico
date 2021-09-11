// Read from changelog.txt and format into a pretty message


const {version} = require('../package.json');
const {embedColor} = require('../config.json');
const {homepage} = require('../package.json');

const path = require('path')
const fs = require('fs')

const Discord = require('discord.js');

const header = `New in version ${version}!`

function simpleReadFileSync(filename)
{
    const filepath = path.resolve(filename)
    var options = {encoding:'utf-8', flag:'r'};
    var buffer = fs.readFileSync(filename, options);
    return buffer
}

const contents = simpleReadFileSync('changelog.txt')
const gitRoot = homepage.split('#')[0];

module.exports = {
  name: 'changelog',
  description: 'Changelog',
  cooldown: 20,
  aliases: ['change', 'changes', 'c'],
  execute: (message, args) => {
    const changelogEmbed = new Discord.MessageEmbed()
      .setColor(embedColor)
      .setTitle(header)
      .setThumbnail(gitRoot + '/blob/master/images/icon.png?raw=true')
      .setDescription(contents)
      .addField( 'Try:', '`!ico help`\n`!ico about`', false )
    console.log(contents)
    message.channel.send(changelogEmbed);
  }
}