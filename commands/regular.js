const {getRandomInt} = require('../util.js');

module.exports = {
  name: 'regular',
  description: 'Roll a regular die',
  aliases: ['d'],
  execute(message, args) {
    var rollResults = []
    var total;
    var formula;
    for (r = args.rolls; r > 0; r-- ) {
      rollResults.push(getRandomInt(1, args.sides));
    }
    total = eval(rollResults.join('+'))
    if (args.plusMinus) {
      total += args.plusMinus;
    }
    
    if (rollResults.length === 1 && !args.plusMinus) {
      message.reply(`${total}`);
    }
    else {
      formula = `${rollResults.join(' + ')}`;
      if (args.plusMinus && args.plusMinus >= 0) {
        formula += ` *+ ${args.plusMinus}*`;
      }
      else if (args.plusMinus && args.plusMinus < 0) {
        formula += ` *- ${Math.abs(args.plusMinus)}*`;
      }
      message.reply(`${formula} = **${total}**`);
    }
  }
};
