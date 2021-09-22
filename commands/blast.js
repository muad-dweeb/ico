/*
Blast the specified command to all servers
Limit 1 blast per command per package version
*/

const {author} = require('../config.json');
const {version} = require('../package.json');
const clients = require('../modules/clients.js');
const {sendChangelog} = require('./changelog.js');


/**
 * Connect to MongoDB Atlas and get target guilds/channels to blast
 * @returns {Array}
 */
async function getTargets(discordClient, mongoCollection) {
  let targetGuilds = [];
  let total = 0;
  // collection.insertOne({"last_blasted": "1.2.0", "guild": "test"});
  // Get all servers I haunt
  for (guild of discordClient.guilds.cache) {
    const id = guild[0];
    const result = await mongoCollection.findOne({'guild': id});
    if (!result) {
      targetGuilds.push(guild);
      total += 1;
      continue;
    }
    console.log(result);
    // Check for their last_blasted version in Atlas
    if (result.last_blasted < version) {
      // Narrow down to the servers who need blasting
      targetGuilds.push(guild);
      total += 1;
    }
  }
  console.log(`Targeting ${total} guilds for blastin`);
  return targetGuilds;
}

/**
 * Fresh message object for each guild;
 * mimics the input message from index.js
 */
const packet = {
  channel: null
};

async function blastEm(discordClient) {
  const args = null;
  const mongo = clients.mongo();
  try {
    console.log('Opening mongoDB connection...')
    await mongo.connect();
    const collection = mongo.db("main").collection("blasts");
    await getTargets(discordClient, collection).then(function(targets) {
      for (g of targets) {
        let channel_id = g[1].systemChannelID;
        const channel = g[1].channels.cache.get(channel_id);
        console.log(`Blasting ${channel.guild} - ${channel.name}`);
        // Forge a message object and send the changelog
        const msg = Object.create(packet);
        msg.channel = channel;
        sendChangelog(msg, args);
        // Update mongo docs with blasted version
        collection.insertOne({"last_blasted": version, "guild": g[0]});
      }
    });
  } finally {
    console.log('Closing mongoDB connection...');
    await mongo.close();
  }
}

module.exports = {
  name: 'blast',
  description: 'So anyway I started blastin',
  execute: (message, args) => {
    console.log(`Blast command issued by member ID: ${message.author.id} (${message.author.username})`);
    if ( message.author.id != author ) {
      console.log('Blast permission denied.');
      message.channel.send(`You do not have permission to use the blast command, ${message.author}.`);
      return;
    } else {
      console.log('Blast permission granted.');
    }
    // finish(blastEm, args.discordClient);
    // blastEm(args.discordClient);
    console.log('Blast disabled. Buggy AF.')
  }
};