module.exports = ((bopit, msg) => {
  return {
    command: "delay", 
    description: "Sets the delay between sounds on autoplay mode.",
    minRank: 0,
    func: () => {
      if (msg.args.length > 1) {
        let seconds = parseInt(msg.args[1]);
        if (seconds > 3600) {
          msg.channel.send("Delay is too long. Please make it less than an hour.")
          return;
        }
        if (seconds < 0) {
          msg.channel.send("Delay is too short. Please make it at least 0.");
          return;
        }
        if (isNaN(seconds)) {
          msg.channel.send("Please input a numerical value of seconds.")
          return;
        }
        bopit.connections[msg.guild.id].delay = seconds;
        msg.channel.send(`Set autoplay delay to ${seconds} seconds.`);
      } else {
        msg.channel.send(`Incorrect usage. Usage: ${bopit.cmdChar}${msg.command} <delay in seconds>`);
      }
    }
  }
})