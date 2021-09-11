// Read from changelog.json and format into a pretty message

const {version} = require('../package.json');
const {embedColor} = require('../config.json');
const {homepage} = require('../package.json');
const lines = require('../changelog.json')[version];

const path = require('path')
const fs = require('fs')

const Discord = require('discord.js');

const header = `New in version ${version}!`

function simpleReadFileSync(filename)
{
    const filepath = path.resolve(filename);
    let options = {encoding:'utf-8', flag:'r'};
    let buffer = fs.readFileSync(filename, options);
    return buffer;
}

function assembleContent(lines) {
  console.log(lines);
  let assembled = '';
  for (line of lines) {
    assembled += '- ' + line + '\n';
  }
  return assembled;
}

const contents = assembleContent(lines);
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