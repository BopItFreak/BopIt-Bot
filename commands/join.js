module.exports = ((bopit, msg) => {
  return {
    command: "join", 
    description: "Joins the bot to the voice channel you are in.",
    minRank: 0,
    func: () => {
      if (msg.member.voice.channel) {
        if (!bopit.breakMode) {
          msg.member.voice.channel.join().then((c) => {
            bopit.connections[msg.guild.id] = c;
            msg.react("✔️");
          })
        } else {
          msg.channel.send("The bot cannot join because it is in break mode.");
        }       
      } else {
        msg.channel.send("Please join a voice channel first before using this command.");
      }      
    }
  }
})