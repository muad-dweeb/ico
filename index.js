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

// TEMP TEST
for (let entry of client.commands.entries()) {
  console.log(entry);
}

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
	console.log('Ready!');
});


// listen for messages
client.on('message', msg => {

  var numDie;
  var dieType;
  var dieSides;
  var commandStr;

  // ignore irrelevant commands, I think
  if (!msg.content.startsWith(config.prefix) || msg.author.bot) return;

  const args = msg.content.slice(config.prefix.length).split(/ +/);

  const commandInput = args.pop().toLowerCase();

  // parse the expected elements from the input string
  if (commandInput.includes('d') || commandInput.includes('hv')) {

    numDie = commandInput.match(/\d+(?=[hvd]{1,2})/g);
    if (!numDie) {
      numDie = 1
    }
    dieType = commandInput.match(/[hvd]{1,2}/g);
    if (dieType == 'hv') {
      dieTypeStr = 'high variance'
    }
    else {
      dieTypeStr = 'regular'
    }
    commandStr = dieTypeStr;
    dieSides = commandInput.match(/(?<=[hvd]{1,2})\d+/g);
    if (!dieSides) {
      msg.reply('you must indicate the number of sides for your die.')
      return;
    }
  }

  else {
    commandStr = 'help'
  }
  
  console.log(`Command received: ${commandInput}`);
  if (dieType && dieSides) {
    console.log(`Rolling ${numDie} ${dieSides}-sided ${dieTypeStr} dice`);
  }

  // command existence short-circuit
  if (!client.commands.has(commandStr)) return;
  
  // the actual command object
  const command = client.commands.get(commandStr);

  // dynamically executing commands
	try {
		command.execute(msg, numDie, dieSides);
	} catch (error) {
		console.error(error);
		msg.reply('there was an error trying to execute that command!');
	}
});


// login to Discord with your app's token
client.login(config.token);

