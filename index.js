// fs is Node's native file system module
const fs = require('fs');

// require the discord.js module
const Discord = require('discord.js');
const client = require('./modules/clients.js').discord();

// this file contains the secret API token
const config = require('./config.json');

// default environment
var environment = 'prod';

// get environment override
const cli_args = process.argv.slice(2);
if ( cli_args.length > 1 ) {
  throw new Error('Too many CLI arguments!');
}
else if ( cli_args.length === 1 ) {
  environment = cli_args[0];
  if (!(environment in config)) {
    throw new Error(`${environment} not defined in config!`);
  }
}

// display available command triggers
console.log(`Environment: ${environment}`);
console.log(`Available triggers:`);
for (let x of config[environment].prefix.values()) {
  console.log(`    ${x}`);
}

// prevent help spam
const cooldowns = new Discord.Collection();

// listen for messages
client.on('message', msg => {

  var dieType;
  var commandStr;
  var args = Object();
  var called = false;
  var prefix;

  args.uptime = client.uptime;
  args.guild_count = client.guilds.cache.size;

  // ignore irrelevant commands, I think
  for (let p of config[environment].prefix.values()) {
    if (msg.content.startsWith(p)) {
      called = true;
      prefix = p
      continue;
    }
  }
  if (!called) return;

  args.content = msg.content.slice(prefix.length).split(/ +/);
  var commandInput = args.content.shift().toLowerCase();

  // parse the expected elements from the input string
  if (commandInput.match(/(?<=[hvd]{1,2})\d+/g)) {

    // add additional args if present
    args.content.forEach(item => commandInput += item);

    args.rolls = commandInput.match(/\d+(?=[hvd]{1,2})/g);
    if (!args.rolls) {
      args.rolls = 1;
    }
    else if (args.rolls > 250) {
      msg.reply('Please be gentle, that\'s too many dice!');
      return;
    }
    dieType = commandInput.match(/[hvd]{1,2}/g);
    if (dieType == 'hv') {
      dieTypeStr = 'highVariance';
    }
    else {
      dieTypeStr = 'regular';
    }
    commandStr = dieTypeStr;
    args.sides = commandInput.match(/(?<=[hvd]{1,2})\d+/g);
    if (!args.sides) {
      msg.reply('you must indicate the number of sides for your die.');
      return;
    }
    else if (args.sides > 999) {
      msg.reply('Please be gentle, that\'s too many sides!');
      return;
    }

    // check for +n notation
    if (commandInput.match(/.*[\+\-]\s*\d+/g)) {
      args.plusMinus = Number(commandInput.match(/(?<=.+)\s*[\+\-]\s*\d+/g));
    }
  } else if (commandInput == 'blast') {
    args.discordClient = client;
  }

  console.log(`Command received: ${commandInput}`);
  if (dieType && args.sides) {
    console.log(`Rolling ${args.rolls} ${args.sides}-sided ${dieTypeStr} dice`);
  }

  // command existence short-circuit
  if (commandStr && !client.commands.has(commandStr)) {
    console.log(`commandStr is invalid: ${commandStr}`);
    return;
  }

  // the actual command object
  const command = client.commands.get(commandStr) || client.commands.get(commandInput) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandInput));

  if ( command == undefined ) {
    msg.reply(`invalid command: \`${commandInput}\`. Try \`!ico help\``);
    return;
  }

  // TODO: convert to MongoDB
  if ( !cooldowns.has(command.name) ) {
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
		command.execute(msg, args);
	} catch (error) {
		console.error(error);
		msg.reply('there was an error trying to execute that command!');
	}
});

// login to Discord with your app's token
client.login(config[environment].token);

