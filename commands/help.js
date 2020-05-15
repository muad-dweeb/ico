module.exports = {
  name: 'help',
  description: 'Help!',
  execute(message, rolls, sides) {
    message.channel.send('**Hi, I\'m Ico!**\n \
    Try rolling a D20 using the following command: `!ico d20`\n \
    You can roll more than one at a time too: `!ico 2d20`\n \
    You can roll any number of sides you want: `!ico 3d42`\n \
    \n \
    I also support high-variance dice:  `!ico hv20`\n \
    ... *but only with the following side counts:* 4, 6, 8, 10, 12, 20, 100\n \
    \n \
    To see this message again, just ask for help: `!ico help`');
  }
};