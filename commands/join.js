module.exports = ((bopit, msg) => {
  return {
    command: "join", 
    description: "Joins the bot to the voice channel you are in.",
    func: () => {
      if (msg.member.voice.channel) {
        msg.member.voice.channel.join().then((c) => {
          bopit.connections[msg.guild.id] = c;
        })
        msg.react("✔️");
      } else {
        msg.channel.send("Please join a voice channel first before using this command.");
      }      
    }
  }
})