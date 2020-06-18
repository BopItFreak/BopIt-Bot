module.exports = ((bopit, msg) => {
  return {
    command: "help", 
    description: "Shows all the commands",
    func: () => {
      let toSend = "";
      let cmds = fs.readdirSync("./commands").toString("utf8").split(",");
      for (let cmd of cmds) {
        cmd = require(`./${cmd}`)(bopit, msg);
        toSend = toSend.concat(`\`${bopit.cmdChar}${cmd.command}\`: **${cmd.description}**\n`);
      }
      msg.channel.send(toSend);
    }
  }
})