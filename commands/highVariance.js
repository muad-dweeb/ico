module.exports = {
  name: 'high variance',
  description: 'Roll a high-variance D20',
  execute(message, rolls, sides) {
    var rollResults = []
    var total;

    // integer dice
    if (sides != 100) {
      for ( r = rolls; r > 0; r-- ) {
        result = highVarianceInt(sides);
        if (typeof result === 'string') {
          message.reply(result);
          return;
        }
        else {
          rollResults.push(result);
        }
      }
    }

    // percentage dice
    else {
      for ( r = rolls; r > 0; r-- ) {
        rollResults.push(highVariancePercent());
      }
    }

    total = eval(rollResults.join('+'))
    if (rollResults.length > 1) {
      message.reply(`${rollResults.join(' + ')} = ${total}`);
    }
    else {
      message.reply(`${total}`);
    }
  }
};

function highVarianceInt(sides) {
  const dice = {
    '4':  [1,1,4,4],
    '6':  [1,1,2,5,6,6],
    '8':  [1,1,2,3,6,7,8,8],
    '10': [1,1,2,2,3,8,9,9,10,10],
    '12': [1,1,2,2,3,4,9,10,11,11,12,12],
    '20': [1,1,1,2,2,3,3,4,5,6,15,16,17,18,18,19,19,20,20,20]
  };

  if (sides.toString() in dice) {
    die = dice[sides.toString()]
    result = die[Math.floor(Math.random() * die.length)]
    return result;
  }
  else {
    return `Unsupported high-variance die. Available dice are ${Object.keys(dice).join(', ')}, 100.`
  }
}

function highVariancePercent() {
  const tens = [00, 00, 10, 10, 20, 70, 80, 80, 90, 90];
  const ones = [1, 1, 2, 2, 3, 8, 9, 9, 10, 10];
  result = tens[Math.floor(Math.random() * tens.length)]
  result += ones[Math.floor(Math.random() * ones.length)]
  return result;
}