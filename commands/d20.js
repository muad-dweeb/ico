module.exports = {
  name: 'd20',
  description: 'Roll a D20',
  execute(message, args) {
    message.reply(getRandomInt(1, 20));
  }
};

// Does JavaScript not have a simple random function???
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}