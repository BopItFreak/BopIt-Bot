module.exports = ((bopit, msg) => {
  return {
    command: "random",
    description: "Plays a random sound.",
    minRank: 0,
    func: () => {
      let files = bopit.files.filter((file) => bopit.verifyFile);
      if (bopit.connections[msg.guild.id] && bopit.connections[msg.guild.id].status == 0) {
        if (!bopit.connections[msg.guild.id].autoplay) {
          let file = files[Math.floor(Math.random() * files.length)];
          bopit.connections[msg.guild.id].play(file);
          msg.react("✔️");
        } else {
          msg.channel.send("This command is disabled while autoplay is enabled.");
        }
      } else {
        msg.channel.send("Please use !join to add me to a voice channel first.");
      }
    }
  }
})