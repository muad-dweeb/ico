module.exports = {
  name: 'regular',
  description: 'Roll a regular die',
  execute(message, args) {
    var rollResults = []
    var total;
    for (r = args.rolls; r > 0; r-- ) {
      rollResults.push(getRandomInt(1, args.sides));
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

// Does JavaScript not have a simple random function???
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}