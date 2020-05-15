module.exports = {
  name: 'help',
  description: 'Help!',
  execute(message, rolls, sides) {
    message.channel.send('Insert help message here');
  }
};