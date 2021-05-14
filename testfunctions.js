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

module.exports.AnswerHello = AnswerHello;
module.exports.TestChannel = TestChannel;
module.exports.TestReactions = TestReactions;