const Discord = require('discord.js');

// fs is Node's native file system module
const fs = require('fs');
const path = require('path')

/**
 * Initialize and set up a fresh Discord client
 * @returns {Discord.Client}
 */
exports.discord = function () {
  // create a new Discord client
  client = new Discord.Client();
  // an extension of JS's native Map class
  client.commands = new Discord.Collection();
  // retrieve command files
  const commandDir = path.resolve('./commands')
  const commandFiles = fs.readdirSync(commandDir).filter(file => file.endsWith('.js'));

  // dynamically set the retrieved commands to the client
  for (const file of commandFiles) {
    const command = require(`${commandDir}/${file}`);
    client.commands.set(command.name, command);
  }
  // Command info
  for (let [key, value] of client.commands.entries()) {
    console.log(value);
  }

  // when the client is ready, run this code
  // this event will only trigger one time after logging in
  client.once('ready', () => {
    console.log('Ready!');
  });
  return client
}