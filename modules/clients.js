const Discord = require('discord.js');

const { mongo } = require('../config.json');
const { MongoClient } = require('mongodb');

// fs is Node's native file system module
const fs = require('fs');
const path = require('path')


/**
 * Initialize and set up a fresh Discord client
 * @returns {Discord.Client}
 */
exports.discord = () => {
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

/**
 * Initialize and set up a fresh MongoDB client
 * @returns {MongoClient}
 */
exports.mongo = () => {
  // Initialize Atlas connection
  const uri = `mongodb+srv://${mongo.user}:${mongo.pass}@ico-cluster.fgm2k.mongodb.net/icodb?retryWrites=true&w=majority`;
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  return client;
}