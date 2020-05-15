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

// prevent help spam
const cooldowns = new Discord.Collection();

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

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }

  // current timestamp
  const now = Date.now();

  const timestamps = cooldowns.get(command.name);
  
  // get the configured cooldown amount, default to 0, and convert to milliseconds
  const cooldownAmount = (command.cooldown || 0) * 1000;

  if (timestamps.has(msg.author.id)) {
    const expirationTime = timestamps.get(msg.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return msg.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
    }
  }

  timestamps.set(msg.author.id, now);
  setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount);

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

