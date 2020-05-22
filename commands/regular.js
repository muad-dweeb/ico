const {getRandomInt,assembleRollResult} = require('../util.js');

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

    message.reply(assembleRollResult(resultList=rollResults, modifer=args.plusMinus));
  }
};
