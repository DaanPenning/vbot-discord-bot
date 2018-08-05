// Initialize variables
let discord = require('discord.js');
let bot = new discord.Client();
let request = require('request');
let botsettings = require('./botsettings.json');
let getdata =  require('./GetData.js');

// Bot startup

bot.on('ready', () => {
  console.log("The bot is ready!");
});

// Bot message handling

bot.on('message', (message) => {

  // Im a lazy cunt

  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  // Initialize commands
  let prefix = botsettings.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  // Check for command
  if(!cmd.startsWith(prefix)) return;
  cmd = cmd.substr(1);

  switch(cmd){
    case "maps":
      getdata((err, body) => {
        if(err) return message.channel.send("Error retrieving Vbot data...");
        body = JSON.parse(body);
        mplist = body.Maplist;
        var msg = generatemessage(JSON.parse(mplist));
        message.reply(msg);
      });
      break;
  }

});

function generatemessage(body) {
  var message = `\n`;
  for(i = 0; i < body.length; i++){
    message += `${i + 1}) ${body[i].Filename} // ${body[i].DownloadURL} // ${body[i].SubmitterName}(${body[i].Submitter})\nNotes: ${body[i].Notes}\n`;
  }

  return message;
}

bot.login(process.env.BOT_TOKEN);
