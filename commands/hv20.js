module.exports = {
  name: 'hv20',
  description: 'Roll a high-variance D20',
  execute(message, args) {
    console.log('TEMP TEST!')
    message.reply(highVariance());
  }
};

function highVariance() {
  var die = [1,1,1,2,2,3,3,4,5,6,15,16,17,18,18,19,19,20,20,20]
  return die[Math.floor(Math.random() * die.length)];
}