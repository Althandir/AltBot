// Checking out on how to create a Discord Bot

const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '!Alt'

const commands = ["Hello","TestChannel","TestReact", "NewRaid"]

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', triggerMessage => 
{
  // Checks if the message has the correct prefix or
  // is send by a bot,
  // if so it does nothing
  if (!triggerMessage.content.startsWith(prefix) || triggerMessage.author.bot) 
  {
    return
  }
  else 
  {
    console.log(`New Message from ${triggerMessage.author}!\nContent: ${triggerMessage.content}`)

    // remove prefix from command
    const args = triggerMessage.content.slice(prefix.length).trim().split(' ');
    // convert to LowerCase so even upperCase can trigger the command
    const command = args.shift().toLowerCase();

    console.log("Recieved Command:" + command);

    switch (command) 
    {
      case ('hello'):
      {
        AnswerHello(triggerMessage);
        break;
      }
      case ('testchannel'):
      {
        TestChannel(triggerMessage);
        break;
      }
      case ('testreact'):
      {
        TestReactions(triggerMessage);
        break;
      }
      case ('newraid'):
      {
        TestRaid(triggerMessage);
        break;
      }
      default:
      {
        TestDefault(triggerMessage);
        break;
      }
    }
  }

});

function AnswerHello(msg) 
{
  msg.reply('Hello!');
}

function TestChannel(msg) 
{
  msg.channel.send('I can read/write messages from/to this channel')
    .then(sentMessage => sentMessage.react('😄'))
    .catch(console.error);
}

function TestReactions(msg) 
{
  msg.react('😄');
  msg.react('👍');
  msg.react('🍓');
}

function TestRaid(msg)
{
  msg.channel.send('Next Raid is scheduled on dd.mm at tt:tt \nReact with 👍 to register yourself.')
    .then(sentMessage => sentMessage.react('👍')
    .then(sentMessage.react('😄')));
}

function TestDefault(msg)
{
  console.log("DefaultCase called!");
}

client.login(process.env.TOKEN);