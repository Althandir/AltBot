// Checking out on how to create a Discord Bot

const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '!Alt'

const commands = ["hello","newraid","testchannel","testreact" ]

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
    console.log(args)

    switch (command) 
    {
      case (commands[0]):
      {
        AnswerHello(triggerMessage);
        break;
      }
      case (commands[1]):
      {        
        TestRaid(triggerMessage, args);
        break;
      }
      case (commands[2]):
      {
        TestChannel(triggerMessage);
        break;
      }
      case (commands[3]):
      {
        TestReactions(triggerMessage);
        break;
      }
      default:
      {
        TestDefault(triggerMessage, args);
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
    .then(sendMessage => sendMessage.react('😄'))
    .catch(console.error);
}

function TestReactions(msg) 
{
  msg.react('😄');
  msg.react('👍');
  msg.react('🍓');
}

function TestRaid(msg, args)
{
  if (!args.length || args.length > 2)
  {
    RaidErrorMsg(msg, 0);
  }
  else 
  {
    const date = args[0].split('.');
    const time = args[1].split(':');
    
    // Checks if the date could be correct. I'm too lazy to do a correct date check.
    // So the bot allows a 31 Feb. ;) 
    // date[0] = day | date[1] = month // time[0] = hour | time[1] = minutes
    if (date[0] < 1 || date[0] > 31 && date[1] < 1 || date[1] > 12)
    {
      return RaidErrorMsg(msg, 1);
    }
    if (time[0] < 0 || time[0] > 23 && time[1] < 0 || time[0] > 59)
    {
      return RaidErrorMsg(msg, 2);
    }

    msg.channel.send(`Next Raid is scheduled on ${args[0]} at ${args[1]} 
    \nReact with 👍 to register yourself.`)
      .then(sendMessage => sendMessage.react('👍')
      .then(sendMessage.react('😄')));
  }
}

function RaidErrorMsg(msg, errorcode)
{
  const prefixErrorMessage = "Whoops, you have given me"
  const postfixErrorMessage = `\nCorrect command:\n${commands[1]} DD.MM TT:TT`
  
  if (errorcode === 0)
  {
    msg.author.send(`${prefixErrorMessage} wrong arguments.
    ${postfixErrorMessage}`)
  }
  else if (errorcode === 1)
  {
    msg.author.send(`${prefixErrorMessage} a possible incorrect date.
    ${postfixErrorMessage}`)
  }
  else if (errorcode === 2)
  {
    msg.author.send(`${prefixErrorMessage} a possible incorrect time.
    ${postfixErrorMessage}`)
  }
}

function TestDefault(msg,args)
{
  console.log("DefaultCase called!");
}

client.login(process.env.TOKEN);