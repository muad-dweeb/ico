// require the discord.js module
const Discord = require('discord.js');

// this file contains the secret API token
const config = require('./config.json');

// create a new Discord client
const client = new Discord.Client();

// Does JavaScript not have a simple random function???
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function highVariance() {
  var die = [1,1,1,2,2,3,3,4,5,6,15,16,17,18,18,19,19,20,20,20]
  return die[Math.floor(Math.random() * die.length)];
}

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
	console.log('Ready!');
});

// listen for messages
client.on('message', msg => {
  if (msg.content === '!ico help') {
    msg.reply('Insert help message here');
  }
  else if (msg.content === '!ico d20') {
    msg.reply(getRandomInt(1, 20));
  }
  else if (msg.content == '!ico hv20') {
    msg.reply(highVariance());
  }
});

// login to Discord with your app's token
client.login(config.token);

