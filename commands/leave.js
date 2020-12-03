module.exports = ((bopit, msg) => {
  return {
    command: "leave", 
    description: "Makes the bot leave the voice channel you are in.",
    minRank: 0,
    func: () => {
      if (msg.member.voice.channel) {
        msg.member.voice.channel.leave();
        if (bopit.connections[msg.guild.id])
          bopit.connections[msg.guild.id].songName = "";
        msg.react("✔️");
      } else {
        msg.channel.send("Please join a voice channel first before using this command.");
      }      
    }
  }
})