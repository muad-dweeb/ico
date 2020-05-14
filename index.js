// fs is Node's native file system module
const fs = require('fs');

// require the discord.js module
const Discord = require('discord.js');

// this file contains the secret API token
const config = require('./config.json');

// create a new Discord client
const client = new Discord.Client();

// an extension of JS's native Map class
client.commands = new Discord.Collection();

// retrieve command files
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// dynamically set the retrieved commands to the client
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
	console.log('Ready!');
});

// listen for messages
client.on('message', msg => {

  // ignore irrelevant commands, I think
  if (!msg.content.startsWith(config.prefix) || msg.author.bot) return;

  const args = msg.content.slice(config.prefix.length).split(/ +/);
  const command = args.pop().toLowerCase();
  
  console.log(`Command received: ${command}`);

	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(msg, args);
	} catch (error) {
		console.error(error);
		msg.reply('there was an error trying to execute that command!');
	}
});

// login to Discord with your app's token
client.login(config.token);

