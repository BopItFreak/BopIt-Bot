module.exports = ((bopit, msg) => {
  return {
    command: "show",
    description: "Shows the currently playing file.",
    minRank: 0,
    func: () => {
      if (bopit.connections[msg.guild.id] && bopit.connections[msg.guild.id].status == 0) {
        if (bopit.connections[msg.guild.id].dispatcher) {
          msg.channel.send("Now Playing: " + bopit.connections[msg.guild.id].songName)
        } else {
          msg.channel.send("Nothing is currently playing.");
        }
      } else {
        msg.channel.send("Please use !join to add me to a voice channel first.");
      }
    }
  }
})