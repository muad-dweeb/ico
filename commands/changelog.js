// Read from changelog.json and format into a pretty message

const {version} = require('../package.json');
const {embedColor} = require('../config.json');
const {homepage} = require('../package.json');
const lines = require('../changelog.json')[version];

const path = require('path')
const fs = require('fs')

const Discord = require('discord.js');

const header = `New in version ${version}!`

/**
 * LEGACY: Read from a line-delimited text file
 * @param {String} filename Name of the file to read from
 * @returns {Buffer}        File contents
 */
function simpleReadFileSync(filename)
{
    const filepath = path.resolve(filename);
    let options = {encoding:'utf-8', flag:'r'};
    let buffer = fs.readFileSync(filepath, options);
    return buffer;
}

/**
 * Assemble a text blob from an array of strings
 * @param {Array[String]} lines Loaded from changelog.json
 * @returns {String}            Multiline string with hyphen-bullets
 */
function assembleContent(lines) {
  console.log(lines);
  let assembled = '';
  for (line of lines) {
    assembled += '- ' + line + '\n';
  }
  return assembled;
}

function sendChangelog(msg, args) {
// exports.sendChangelog = (msg, args) => {
  const contents = assembleContent(lines);
  const gitRoot = homepage.split('#')[0];
  const changelogEmbed = new Discord.MessageEmbed()
    .setColor(embedColor)
    .setTitle(header)
    .setThumbnail(gitRoot + '/blob/master/images/icon.png?raw=true')
    .setDescription(contents)
    .addField( 'Try:', '`!ico help`\n`!ico about`', false )
  // console.log(contents)
  msg.channel.send(changelogEmbed);
}

module.exports = {
  sendChangelog: sendChangelog,
  name: 'changelog',
  description: 'Changelog',
  cooldown: 20,
  aliases: ['change', 'changes', 'c'],
  execute: (message, args) => {
    sendChangelog(message, args);
  }
}