module.exports = ((bopit, msg) => {
  return {
    command: "skip",
    description: "Skips a file in autoplay mode, or stops it normally.",
    func: () => {
      if (bopit.connections[msg.guild.id] && bopit.connections[msg.guild.id].status == 0) {
        if (bopit.connections[msg.guild.id].dispatcher) {
          bopit.connections[msg.guild.id].dispatcher.emit("finish");
          msg.react("✔️");
        } else {
          msg.channel.send("Cannot skip between files.");
        }
      } else {
        msg.channel.send("Please use !join to add me to a voice channel first.");
      }
    }
  }
})