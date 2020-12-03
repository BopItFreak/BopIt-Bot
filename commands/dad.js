module.exports = ((bopit, msg) => {
  return {
    command: "dad",
    description: "Turns dad mode on or off.",
    minRank: 0,
    func: () => {
      msg.channel.send("Dad mode is now broben.")
      //bopit.dadMode = !bopit.dadMode;
      //msg.channel.send(`Dad Mode ${bopit.dadMode ? "enabled" : "disabled"}.`);
    }
  }
})