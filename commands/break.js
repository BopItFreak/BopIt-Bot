module.exports = ((bopit, msg) => {
  return {
    command: "break",
    description: "Turns break mode on or off. The bot cannot join when enabled.",
    minRank: 2,
    func: () => {
      bopit.breakMode = !bopit.breakMode;
      msg.channel.send(`Break mode is ${bopit.breakMode ? "enabled" : "disabled"}. ${bopit.breakMode ? "It's time for the bot to take a break." : "The bot can join again!"}`);
    }
  }
})