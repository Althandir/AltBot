// Checking out on how to create a Discord Bot
const Discord = require('discord.js');
const client = new Discord.Client();

const keepAlive = require("./server");
const testFunctions = require("./testfunctions");
const helpers = require("./helpers");

const prefix = '!alt';
const commands = ["hello","newraid","testchannel","testreact" ];

const allowedSplitValues = ['.',':',',','/','|','\\'];

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', triggerMessage => 
{
  try
  {
    // Checks if the message has the correct prefix or
    // is send by a bot,
    // if so it does nothing
    if (!triggerMessage.content.startsWith(prefix) || triggerMessage.author.bot)
    {
      return;
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
          testFunctions.AnswerHello(triggerMessage);
          break;
        }
        case (commands[1]):
        {        
          newRaidMessage(triggerMessage, args);
          break;
        }
        case (commands[2]):
        {
          testFunctions.TestChannel(triggerMessage);
          break;
        }
        case (commands[3]):
        {
          testFunctions.TestReactions(triggerMessage);
          break;
        }
        default:
        {
          DefaultCommandCase(triggerMessage, args);
          break;
        }
      }
    }
  }
  catch (error)
  {
    console.error(error);
  }
});

function newRaidMessage(msg, args)
{
  // Check if the arguments are correct
  if (!args.length || args.length > 2)
  {
    console.error("Error with arg length!")
    RaidErrorMsg(msg, 0);
    return;
  }
  if (!helpers.HasCorrectLength(args[0]) || !helpers.HasCorrectLength(args[1]) )
  {
    console.error("Error with args length!")
    RaidErrorMsg(msg, 0);
    return;
  }
  // Check if given argument consists out of numbers
  if (!helpers.IsNumericType(args[0]) || !helpers.IsNumericType(args[1]))
  {
    console.error("Error with numeric type!")
    RaidErrorMsg(msg, 4);
    return;
  }

  // Checks if the Splitvalue is correct
  if (!helpers.IsSplitValueAtCorrectPosition(args[0]) || !helpers.IsSplitValueAtCorrectPosition(args[1]))
  {
    console.error("Error with Splitvalue pos!")
    RaidErrorMsg(msg, 0);
    return;
  }
  if (helpers.IsFalseSplitValue(args[0], allowedSplitValues) || helpers.IsFalseSplitValue(args[1], allowedSplitValues))
  {
    RaidErrorMsg(msg, 3);
    return;
  }

  var dateSplitValue = args[0].charAt(2);
  var timeSplitValue = args[1].charAt(2);

  const date = args[0].split(dateSplitValue);
  const time = args[1].split(timeSplitValue);
  
  // Checks if the date could be correct. I'm too lazy to do a correct date check.
  // So the bot allows a 31 Feb. ;) 
  // date[0] = day | date[1] = month // time[0] = hour | time[1] = minutes
  console.log(date[0]);
  console.log(date[1]);
  if ((date[0] < 1 || date[0] > 31) || (date[1] < 1 || date[1] > 12))
  {
    return RaidErrorMsg(msg, 1);
  }
  if ((time[0] < 0 || time[0] > 23) || (time[1] < 0 || time[0] > 59))
  {
    return RaidErrorMsg(msg, 2);
  }

  msg.channel.send(`Next Raid is scheduled on ${date[0]}${dateSplitValue}${date[1]} at ${time[0]}${timeSplitValue}${time[1]} 
  \nReact with 👍 to register yourself.`)
    .then(sendMessage => sendMessage.react('👍')
    .then(sendMessage.react('😄')));
  
}

function RaidErrorMsg(msg, errorcode)
{
  const prefixErrorMessage = "Whoops, you have given me"
  const postfixErrorMessage = `\n\nCorrect command:\n${commands[1]} DD<Divider>MM TT<Divider>TT\nAccepted dividers: ${allowedSplitValues.join('   ')}`
  
  switch(errorcode)
  {
    case (0):
    {
      msg.author.send(`${prefixErrorMessage} **wrong arguments**. ${postfixErrorMessage}`);
      break;
    }
    case (1):
    {
      msg.author.send(`${prefixErrorMessage} a possible **incorrect date**. ${postfixErrorMessage}`);
      break;
    }
    case (2):
    {
      msg.author.send(`${prefixErrorMessage} a possible **incorrect time**. ${postfixErrorMessage}`);
      break;
    }
    case (3):
    {
      msg.author.send(`${prefixErrorMessage} a **incorrect divider**. ${postfixErrorMessage}`);
      break;
    }
    case (4):
    {
      msg.author.send(`${prefixErrorMessage} **incorrect numbers**. ${postfixErrorMessage}`);
      break;
    }
  }
}

function DefaultCommandCase(msg,args)
{
  console.log("DefaultCase called!");

  msg.author.send(`Hey, you used my prefix to call me, but i could not find a corresponding command ☹️. Use my commands in the channel where you want me to answer 😄 Here are my commands:"
  \n!Alt ${commands.join(' | ')}`);
}

keepAlive();
client.login(process.env.TOKEN);