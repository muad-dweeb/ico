const Discord = require('discord.js');

const {getRandomInt,rollOutput} = require('../util.js');

module.exports = {
  name: 'regular',
  description: 'Roll a regular die',
  aliases: ['d'],
  execute(message, args) {
    var rollResults = []
    for (r = args.rolls; r > 0; r-- ) {
      rollResults.push(getRandomInt(1, args.sides));
    }

    result = rollOutput(resultList=rollResults, modifier=args.plusMinus)

    const resultEmbed = new Discord.MessageEmbed()
      .setColor('#ec53ff')
      .setTitle(result.total)
      .setFooter(result.formula || '')

    message.reply(resultEmbed);
  }
};
