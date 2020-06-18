module.exports = ((bopit, msg) => {
  return {
    command: "leave", 
    description: "Makes the bot leave the voice channel you are in.",
    func: () => {
      if (msg.member.voice.channel) {
        msg.member.voice.channel.leave();
        msg.react("✔️");
      } else {
        msg.channel.send("Please join a voice channel first before using this command.");
      }      
    }
  }
})