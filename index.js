// Checking out on how to create a Discord Bot

const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', recievedMessage => 
{
  // Checks if the message is send by a bot,
  // if so it does nothing
  if (recievedMessage.author.bot) 
  {
    return
  }
  else 
  {
    switch (recievedMessage.content) 
    {
      case ('!AltHello'):
        {
          AnswerHello(recievedMessage);
          break;
        }
      case ('!AltTestChannel'):
        {
          TestChannel(recievedMessage);
          break;
        }
      case ('!AltTestReact'):
        {
          TestReactions(recievedMessage)
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
    .then(newMessage => newMessage.react('😄'))
    .catch(console.error);
}

function TestReactions(msg) 
{
  msg.react('😄');
  msg.react('👍');
  msg.react('🍓');
}

client.login(process.env.TOKEN);