const {author} = require('../config.json');

module.exports = {
  name: 'reload',
  description: 'Reloads a command',
  execute(message, args) {

    console.log(`Reload command issued by member ID: ${message.author.id} (${message.author.username})`);
    if ( message.author.id != author ) {
      message.channel.send(`You do not have permission to use the reload command, ${message.author}.`);
      return;
    }


    if (!args.content.length) return message.channel.send(`You didn't pass any command to reload, ${message.author}!`);
    const commandName = args.content[0];
    const command = message.client.commands.get(commandName) || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    
    if (!command) return message.channel.send(`There is no command with name or alias \`${commandName}\`, ${message.author}!`);

    // remove command from cache
    delete require.cache[require.resolve(`./${command.name}.js`)];

    // require the file again and add the freshly loaded command to the client
    try {
      const newCommand = require(`./${command.name}.js`);
      message.client.commands.set(newCommand.name, newCommand);
      message.channel.send(`Command \`${command.name}\` was reloaded!`);
    } catch (error) {
      console.log(error);
      message.channel.send(`There was an error while reloading  a command \`${command.name}\`:\n\`${error.message}\``);
    }
  }
}